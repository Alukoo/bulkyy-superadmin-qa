import { expect } from '@playwright/test';

export class DashboardPage {
  constructor(page) {
    this.page = page;
    this.dashboardLink = page.getByRole('link', { name: 'Dashboard' });
    this.performanceSearch = page.getByRole('textbox', { name: 'Search performance…' });
  }

  async open() {
    await this.dashboardLink.click();
  }

  async expectLoaded() {
    await expect(this.page.getByText('Total Regional Leads')).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'GMV trend (6 months)' })).toBeVisible();
  }

  async searchPerformance(term) {
    await this.performanceSearch.fill(term);
  }
}