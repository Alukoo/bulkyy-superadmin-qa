import { expect } from '@playwright/test';

export class UsersPage {
  constructor(page) {
    this.page = page;
    this.usersLink = page.getByRole('link', { name: 'Users' });
    this.createUserButton = page.getByRole('button', { name: 'Create user' });
    this.createUserDialog = page.getByRole('dialog', { name: 'Create user' });
  }

  async open() {
    await this.usersLink.click();
    await expect(this.createUserButton).toBeVisible();
  }

  async expectLoaded() {
    await expect(this.page.getByText('Total users5')).toBeVisible();
  }

  async filterByRole(roleLabel) {
    await this.page.getByText(roleLabel).click();
  }

  userRow() {
    return this.page.getByRole('row', { name: 'pulito pulire pulitopulire@' });
  }

  async resetPassword({ cancel = false } = {}) {
    const row = this.userRow();
    await row.getByLabel('Actions').click();
    await this.page.getByRole('menuitem', { name: 'Reset password' }).click();

    if (cancel) {
      await this.page.getByRole('button', { name: 'Cancel' }).click();
      return;
    }

    await this.page.getByRole('button', { name: 'Email temporary password' }).click();
  }

  async openCreateUser() {
    await this.createUserButton.click({ force: true });
    await expect(this.createUserDialog).toBeVisible();
  }

  async fillCreateUser({ email, firstName, lastName, phone }) {
    await this.createUserDialog.getByRole('textbox', { name: 'Email' }).fill(email);
    await this.createUserDialog.getByRole('textbox', { name: 'First name' }).fill(firstName);
    await this.createUserDialog.getByRole('textbox', { name: 'Last name' }).fill(lastName);
    if (phone) {
      await this.createUserDialog.getByRole('textbox', { name: 'Phone' }).fill(phone);
    }
  }

  async closeCreateUser() {
    await this.page.getByRole('button', { name: 'Close drawer' }).click();
    await expect(this.createUserDialog).toBeHidden();
  }
}