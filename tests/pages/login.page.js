import { expect } from '@playwright/test';

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.getByRole('textbox', { name: 'Input your registered email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Input your password account' });
    this.submitButton = page.getByRole('button', { name: 'Submit' });
  }

  async open() {
    await this.page.goto('/login', { waitUntil: 'domcontentloaded' });
    await expect(this.emailInput).toBeVisible();
  }

  async login(email = process.env.SUPERADMIN_EMAIL, password = process.env.SUPERADMIN_PASSWORD) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async expectLoginError() {
    await expect(this.page.locator('[role="alert"]')).toBeVisible();
  }
}