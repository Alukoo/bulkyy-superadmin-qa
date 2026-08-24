import { expect } from '@playwright/test';

export class CommissionsPage {
  constructor(page) {
    this.page = page;
    this.scheduleButton = page.getByRole('button', { name: 'Schedule rate change' });
  }

  async openRateScheduling() {
    await this.page.getByRole('link', { name: 'Commissions' }).click();
    await this.page.getByRole('link', { name: 'Commission Rates' }).click();
    await this.scheduleButton.click();
  }

  async expectSchedulingOpen() {
    await expect(this.scheduleButton).toBeVisible();
  }
}