import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatVolumeCompact,
  formatSessionDuration,
  formatClock
} from '../src/utils/formatting.js';

test('formatVolumeCompact formats kg and tonnes cleanly', () => {
  assert.equal(formatVolumeCompact(0), '0 kg');
  assert.equal(formatVolumeCompact(null), '0 kg');
  assert.equal(formatVolumeCompact(450), '450 kg');
  assert.equal(formatVolumeCompact(1500), '1.5 t');
  assert.equal(formatVolumeCompact(24000), '24.0 t');
});

test('formatSessionDuration formats seconds into minutes and seconds', () => {
  assert.equal(formatSessionDuration(0), '0s');
  assert.equal(formatSessionDuration(45), '45s');
  assert.equal(formatSessionDuration(65), '1m 05s');
  assert.equal(formatSessionDuration(3600), '60m 00s');
});

test('formatClock formats into digital MM:SS or HH:MM:SS', () => {
  assert.equal(formatClock(0), '00:00');
  assert.equal(formatClock(45), '00:45');
  assert.equal(formatClock(125), '02:05');
  assert.equal(formatClock(3665), '01:01:05');
});

