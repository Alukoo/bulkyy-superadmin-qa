import { expect } from '@playwright/test';

export class OrganizationPage {
  constructor(page) {
    this.page = page;
  }

  async openZones() {
    await this.page.goto('/divisions', { waitUntil: 'domcontentloaded' });
    await expect(this.page.getByRole('link', { name: 'View' }).first()).toBeVisible();
  }

  async openFirstZone() {
    await this.page.getByRole('link', { name: 'View' }).first().click();
  }

  async expectZonesNavigation() {
    await expect(this.page.getByRole('link', { name: 'Zones' })).toBeVisible();
  }

  async openAggregatorUsers() {
    await this.page.goto('/aggregators', { waitUntil: 'domcontentloaded' });
    await this.page.getByRole('button', { name: 'Manage users' }).click();
  }

  async openVendor() {
    await this.page.getByRole('link', { name: 'Vendors' }).click();
    await this.page.getByText('1').nth(1).click();
    await this.page.getByRole('link', { name: 'Beemah pastries' }).click();
  }
}