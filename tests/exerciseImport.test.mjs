import test from 'node:test';
import assert from 'node:assert/strict';
import {
  isAnimatedGifUrl,
  isBodyweightEquipment,
  parseSingleExerciseJson,
} from '../src/utils/exerciseImport.js';

test('isAnimatedGifUrl detects GIF URLs and GIF data URIs', () => {
  assert.equal(isAnimatedGifUrl('https://example.com/squat.gif?v=2'), true);
  assert.equal(isAnimatedGifUrl('data:image/gif;base64,R0lGODlhAQABAIAA'), true);
  assert.equal(isAnimatedGifUrl('/assets/squat.webp'), false);
});

test('isBodyweightEquipment recognizes bodyweight labels across formats', () => {
  assert.equal(isBodyweightEquipment(''), true);
  assert.equal(isBodyweightEquipment('Bodyweight'), true);
  assert.equal(isBodyweightEquipment('Bodyweight (Mat)'), true);
  assert.equal(isBodyweightEquipment('Corpo Libero'), true);
  assert.equal(isBodyweightEquipment('Dumbbell Pair'), false);
});

test('parseSingleExerciseJson normalizes CORPO and free-exercise-db style JSON', () => {
  const normalized = parseSingleExerciseJson(JSON.stringify({
    name: 'Bulgarian Split Squat',
    primaryMuscles: ['quads'],
    secondaryMuscles: ['glutes'],
    equipment: 'Dumbbell Pair',
    instructions: [
      'Place rear foot on bench.',
      'Lower back knee under control.',
      'Drive through front heel.',
    ],
  }));

  assert.equal(normalized.id, 'ex-bulgarian-split-squat');
  assert.equal(normalized.muscleKey, 'quads');
  assert.equal(normalized.requiresEquipment, true);
  assert.equal(normalized.execution.setup, 'Place rear foot on bench.');
  assert.equal(normalized.execution.eccentric, 'Lower back knee under control.');
  assert.equal(normalized.execution.concentric, 'Drive through front heel.');
});

test('parseSingleExerciseJson rejects multi-exercise arrays and missing names', () => {
  assert.throws(
    () => parseSingleExerciseJson(JSON.stringify([{ name: 'A' }, { name: 'B' }])),
    /one exercise at a time/i
  );
  assert.throws(
    () => parseSingleExerciseJson(JSON.stringify({ equipment: 'Barbell' })),
    /Missing required "name"/i
  );
});

