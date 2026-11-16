import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { haptics } from '../src/utils/haptics.js';

const ROOT_DIR = path.resolve(import.meta.dirname, '..');

test('haptics helpers handle unsupported environments and invoke navigator.vibrate patterns cleanly', () => {
  const originalDesc = Object.getOwnPropertyDescriptor(globalThis, 'navigator');
  const restore = () => {
    if (originalDesc) {
      Object.defineProperty(globalThis, 'navigator', originalDesc);
    } else {
      delete globalThis.navigator;
    }
  };

  try {
    Object.defineProperty(globalThis, 'navigator', { value: {}, configurable: true });
    assert.equal(haptics.setComplete(), false);
    assert.equal(haptics.timerComplete(), false);
    assert.equal(haptics.undo(), false);

    const calls = [];
    Object.defineProperty(globalThis, 'navigator', {
      value: {
        vibrate: (pattern) => {
          calls.push(pattern);
          return true;
        },
      },
      configurable: true,
    });
    assert.equal(haptics.setComplete(), true);
    assert.equal(haptics.timerComplete(), true);
    assert.equal(haptics.undo(), true);
    assert.deepEqual(calls, [[12], [18, 60, 18], [10]]);

    Object.defineProperty(globalThis, 'navigator', {
      value: {
        vibrate: () => {
          throw new Error('Blocked');
        },
      },
      configurable: true,
    });
    assert.equal(haptics.timerComplete(), false);
  } finally {
    restore();
  }
});

test('mcgill-curl-up.jpg stays optimized within canonical asset weight budget', () => {
  const assetPath = path.join(ROOT_DIR, 'src', 'assets', 'exercises', 'mcgill-curl-up.jpg');
  const stats = fs.statSync(assetPath);
  assert.ok(stats.size > 5 * 1024, 'Expected non-empty JPEG asset');
  assert.ok(stats.size <= 65 * 1024, `Expected <= 65 KB compressed asset, got ${stats.size} bytes`);
});

test('src/styles stays free of dead dark-mode selectors and pruned legacy classes', () => {
  const stylesDir = path.join(ROOT_DIR, 'src', 'styles');
  const files = fs.readdirSync(stylesDir).filter((f) => f.endsWith('.css'));
  const combined = files.map((f) => fs.readFileSync(path.join(stylesDir, f), 'utf8')).join('\n');

  assert.equal(combined.includes('[data-theme="dark"]'), false, 'Dark-theme selectors must remain pruned');
  assert.equal(combined.includes('.theme-toggle-btn'), false, 'Unused theme-toggle-btn selector must remain pruned');
  assert.equal(combined.includes('.routine-level-pill'), false, 'Unused routine-level-pill selector must remain pruned');
  assert.equal(combined.includes('.undo-toast-pill'), true, 'Undo toast styles must exist');
});
