import test from 'node:test';
import assert from 'node:assert/strict';
import {
  MS_PER_SECOND,
  SECONDS_PER_MINUTE,
  MS_PER_DAY,
  DEFAULT_REST_SECONDS,
  DEFAULT_SETS,
  DEFAULT_REPS
} from '../src/utils/constants.js';

test('constants.js: timing and duration multipliers are accurate', () => {
  assert.equal(MS_PER_SECOND, 1000);
  assert.equal(SECONDS_PER_MINUTE, 60);
  assert.equal(MS_PER_DAY, 24 * 60 * 60 * 1000);
  assert.equal(MS_PER_DAY, 86_400_000);
});

test('constants.js: sensible exercise defaults are configured', () => {
  assert.equal(DEFAULT_REST_SECONDS, 60);
  assert.equal(DEFAULT_SETS, 3);
  assert.equal(DEFAULT_REPS, '10');
});

