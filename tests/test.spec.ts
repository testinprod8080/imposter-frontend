import { test, expect } from '@playwright/test';

test('join game button navigates to lobby', async ({ page }) => {
  let contractAddress = 'somecontractaddress';

  // Navigate the page
  await page.goto('/');

  // Click [placeholder="Enter game contract address"]
  await page.locator('[placeholder="Enter game contract address"]').click();

  // Fill [placeholder="Enter game contract address"]
  await page.locator('[placeholder="Enter game contract address"]').fill(contractAddress);

  // Click text=Search
  await page.locator('text=Search').click();

  // Click text=Join Game
  await page.locator('text=Join Game').click();

  // Navigate the page
  await expect(page).toHaveURL('/lobby/' + contractAddress)
});
