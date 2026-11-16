import { test, expect } from '@playwright/test';

test.describe('Nova Soma Critical User Flows', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.localStorage.clear());
    await page.reload();
  });

  test('loads Home dashboard, populates Demo Data, and clears demo sessions cleanly', async ({ page }) => {
    await expect(page.getByText("TODAY'S SCHEDULED WORKOUT")).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Weekly Consistency' })).toBeVisible();

    await page.getByRole('button', { name: /Local Data & Backup/i }).click();
    await expect(page.getByRole('heading', { name: 'Data & Backup' })).toBeVisible();

    await page.getByRole('button', { name: 'Load Demo Data' }).click();
    await expect(page.getByText(/Loaded 14 sample sessions/i)).toBeVisible();

    await page.getByRole('button', { name: 'Clear Demo Data' }).click();
    await expect(page.getByText(/Sample demo sessions removed cleanly/i)).toBeVisible();

    await page.getByRole('button', { name: 'Close modal' }).click();
  });

  test('opens Workout Overview, toggles Manage Mode and In-Depth table', async ({ page }) => {
    await page.getByRole('button', { name: 'View Routine' }).click();
    await expect(page).toHaveURL(/#workout\//);

    await page.getByRole('button', { name: /Reorder & Manage/i }).click();
    await expect(page.getByRole('button', { name: /Done Managing/i })).toBeVisible();

    await page.getByRole('button', { name: /In-Depth/i }).first().click();
    await expect(page.getByText('Sets Architecture & Target Reps').first()).toBeVisible();
  });

  test('starts Live Workout Player, saves draft on exit, and discards draft from Home', async ({ page }) => {
    await page.locator('.btn-focus-start').click();
    await expect(page.getByRole('button', { name: 'Finish' })).toBeVisible();

    const firstCompleteBtn = page.getByRole('button', { name: /Complete .* set 1/i }).first();
    await firstCompleteBtn.click();

    await page.getByRole('button', { name: 'Close session' }).click();
    await expect(page.getByText('UNFINISHED SESSION DRAFT')).toBeVisible();

    await page.getByRole('button', { name: 'Discard Draft' }).click();
    await expect(page.getByText('UNFINISHED SESSION DRAFT')).toHaveCount(0);
    await expect(page.locator('.undo-toast-pill')).toContainText('Workout draft discarded');

    await page.locator('.undo-toast-action').click();
    await expect(page.getByText('UNFINISHED SESSION DRAFT')).toBeVisible();

    await page.getByRole('button', { name: 'Discard Draft' }).click();
    await expect(page.getByText('UNFINISHED SESSION DRAFT')).toHaveCount(0);
  });

  test('renders cleanly at 390x844 mobile viewport with zero horizontal overflow and usable live player dock', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    const assertNoOverflow = async (label) => {
      const { scrollWidth, innerWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
      }));
      expect(scrollWidth, `Expected no overflow on ${label}`).toBeLessThanOrEqual(innerWidth);
    };

    await assertNoOverflow('mobile Home');

    await page.getByRole('button', { name: 'View Routine' }).click();
    await expect(page).toHaveURL(/#workout\//);
    await assertNoOverflow('mobile Overview');

    await page.getByRole('button', { name: /Library/i }).click();
    await expect(page).toHaveURL(/#library/);
    await assertNoOverflow('mobile Library');

    await page.goto('/');
    await page.locator('.btn-focus-start').click();
    await expect(page.locator('.player-sticky-dock')).toBeVisible();
    await expect(page.locator('.dock-progress-rail')).toBeVisible();
    await assertNoOverflow('mobile Player');

    await page.locator('.dock-play-btn').click();
    await expect(page.locator('.dock-context-pill.is-log')).toBeVisible();
    await page.locator('.dock-mode-seg-btn.is-rest').click();
    await expect(page.locator('.dock-mode-seg-btn.is-rest')).toHaveClass(/active/);

    await page.getByRole('button', { name: '+ Set' }).first().click();
    await page.getByRole('button', { name: 'Remove last set' }).first().click();
    await expect(page.locator('.undo-toast-pill')).toBeVisible();
    await page.locator('.undo-toast-action').click();
    await expect(page.locator('.undo-toast-pill')).toHaveCount(0);
  });

  test('filters 127-movement Exercise Library by Obliques and resets cleanly', async ({ page }) => {
    await page.getByRole('button', { name: /Library/i }).click();
    await expect(page).toHaveURL(/#library/);
    await expect(page.getByText(/Showing\s+127\s+of\s+127\s+movements/i)).toBeVisible();

    await page.getByRole('button', { name: 'Obliques', exact: true }).click();
    await expect(page.getByText(/Showing\s+7\s+of\s+127\s+movements/i)).toBeVisible();

    await page.getByRole('button', { name: 'Reset', exact: true }).click();
    await expect(page.getByText(/Showing\s+127\s+of\s+127\s+movements/i)).toBeVisible();
  });
});
