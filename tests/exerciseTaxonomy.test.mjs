import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ALL_RAW_EXERCISES } from '../src/data/exercises/index.js';
import {
  SCIENTIFIC_SOURCES,
  VARIATION_TYPES,
  MOVEMENT_FAMILIES,
  EXERCISE_TAXONOMY,
  enrichExerciseWithTaxonomy,
  getExerciseVariations
} from '../src/data/exerciseTaxonomy.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

test('canonical exercise database has 135 unique exercises', () => {
  assert.equal(ALL_RAW_EXERCISES.length, 135);
  const ids = ALL_RAW_EXERCISES.map((ex) => ex.id);
  assert.equal(new Set(ids).size, 135, 'All canonical exercise IDs must be unique');
});

test('every canonical exercise has complete standardized scientific taxonomy & biomechanics', () => {
  const validVariationTypes = new Set(VARIATION_TYPES);
  const requiredBiomechFields = [
    'plane',
    'chain',
    'laterality',
    'loadVector',
    'resistanceProfile',
    'jointActions'
  ];

  for (const rawEx of ALL_RAW_EXERCISES) {
    const tax = EXERCISE_TAXONOMY[rawEx.id];
    assert.ok(tax, `Missing EXERCISE_TAXONOMY entry for "${rawEx.id}"`);
    assert.equal(typeof tax.scientificName, 'string', `Missing scientificName for "${rawEx.id}"`);
    assert.ok(tax.scientificName.trim().length > 0, `Empty scientificName for "${rawEx.id}"`);

    assert.ok(
      MOVEMENT_FAMILIES[tax.familyId],
      `Invalid familyId "${tax.familyId}" on "${rawEx.id}"`
    );
    assert.ok(
      validVariationTypes.has(tax.variationType),
      `Invalid variationType "${tax.variationType}" on "${rawEx.id}"`
    );
    assert.equal(typeof tax.variationLabel, 'string', `Missing variationLabel for "${rawEx.id}"`);
    assert.ok(tax.variationLabel.trim().length > 0, `Empty variationLabel for "${rawEx.id}"`);

    assert.ok(tax.biomechanics, `Missing biomechanics object for "${rawEx.id}"`);
    for (const field of requiredBiomechFields) {
      assert.equal(
        typeof tax.biomechanics[field],
        'string',
        `Missing biomechanics.${field} for "${rawEx.id}"`
      );
      assert.ok(
        tax.biomechanics[field].trim().length > 0,
        `Empty biomechanics.${field} for "${rawEx.id}"`
      );
    }

    const enriched = enrichExerciseWithTaxonomy(rawEx);
    assert.equal(enriched.scientificName, tax.scientificName);
    assert.equal(enriched.familyId, tax.familyId);
    assert.equal(enriched.familyName, MOVEMENT_FAMILIES[tax.familyId].name);
    assert.deepEqual(enriched.biomechanics, tax.biomechanics);
  }
});

test('all 127 illustrated exercises have valid EXERCISE_MEDIA mappings and existing files on disk', () => {
  const mediaFilePath = path.join(ROOT_DIR, 'src', 'data', 'exerciseMedia.js');
  const mediaSource = fs.readFileSync(mediaFilePath, 'utf8');

  const importedVars = new Map();
  const importRegex = /^import\s+(\w+)\s+from\s+'\.\.\/assets\/exercises\/([^']+)';/gm;
  for (const match of mediaSource.matchAll(importRegex)) {
    importedVars.set(match[1], match[2]);
  }

  const mappedIds = new Map();
  const mapRegex = /^\s*'([^']+)':\s*(\w+),?\s*$/gm;
  for (const match of mediaSource.matchAll(mapRegex)) {
    mappedIds.set(match[1], match[2]);
  }

  assert.equal(importedVars.size, 127, 'Expected 127 imported exercise asset files');
  assert.equal(mappedIds.size, 127, 'Expected 127 EXERCISE_MEDIA entries');

  for (const [varName, assetFilename] of importedVars.entries()) {
    const absAssetPath = path.join(ROOT_DIR, 'src', 'assets', 'exercises', assetFilename);
    assert.ok(
      fs.existsSync(absAssetPath),
      `Mapped asset file does not exist for ${varName}: ${absAssetPath}`
    );
  }

  const rawIdsWithoutIllustration = ALL_RAW_EXERCISES
    .map((ex) => ex.id)
    .filter((id) => !mappedIds.has(id));

  assert.deepEqual(rawIdsWithoutIllustration, [
    'wu-lateral-glute-step-down',
    'wu-dumbbell-glute-step-down',
    'wu-kettlebell-glute-step-down',
    'wu-banded-glute-step-down',
    'wu-elevated-ankle-dorsiflexion',
    'wu-dumbbell-ankle-dorsiflexion',
    'wu-kettlebell-ankle-dorsiflexion',
    'wu-banded-ankle-dorsiflexion'
  ]);

  for (const [id, varName] of mappedIds.entries()) {
    assert.ok(importedVars.has(varName), `Unimported variable "${varName}" referenced by "${id}"`);
  }
});

test('getExerciseVariations returns sibling variations in the same family without self', () => {
  const enrichedDb = ALL_RAW_EXERCISES.map((ex) => enrichExerciseWithTaxonomy(ex));
  const rdl = enrichedDb.find((ex) => ex.id === 'ex-romanian-deadlift');
  assert.ok(rdl, 'Expected ex-romanian-deadlift in database');

  const rdlSiblings = getExerciseVariations(rdl, enrichedDb);
  assert.ok(rdlSiblings.length >= 3, 'Expected multiple hip-hinge sibling variations for RDL');
  assert.ok(
    rdlSiblings.every((item) => item.id !== rdl.id && item.familyId === rdl.familyId),
    'All sibling variations must share familyId and exclude current exercise'
  );
  assert.ok(
    rdlSiblings.some((item) => item.id === 'ex-b-stance-rdl'),
    'Expected B-Stance RDL as a sibling variation of Barbell RDL'
  );

  const stepDown = enrichedDb.find((ex) => ex.id === 'wu-dumbbell-glute-step-down');
  assert.ok(stepDown, 'Expected wu-dumbbell-glute-step-down in database');
  const stepDownSiblings = getExerciseVariations(stepDown, enrichedDb);
  assert.equal(stepDownSiblings.length, 3);

  const dorsiflexion = enrichedDb.find((ex) => ex.id === 'wu-elevated-ankle-dorsiflexion');
  assert.ok(dorsiflexion, 'Expected wu-elevated-ankle-dorsiflexion in database');
  const dorsiflexionSiblings = getExerciseVariations(dorsiflexion, enrichedDb);
  assert.equal(dorsiflexionSiblings.length, 3);
});

test('SCIENTIFIC_SOURCES documents all 4 authoritative kinesiology and anatomy standards', () => {
  assert.equal(SCIENTIFIC_SOURCES.length, 4);
  const sourceIds = SCIENTIFIC_SOURCES.map((s) => s.id);
  assert.deepEqual(sourceIds, ['nsca', 'exrx', 'terminologia-anatomica', 'biomechanics-lit']);
  for (const src of SCIENTIFIC_SOURCES) {
    assert.ok(src.citation && src.citation.trim().length > 0);
    assert.ok(src.scope && src.scope.trim().length > 0);
  }
});
