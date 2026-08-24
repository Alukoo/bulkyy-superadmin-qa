import { test, expect } from '@playwright/test';
import { CommissionsPage } from './pages/commissions.page.js';
import { DashboardPage } from './pages/dashboard.page.js';
import { LoginPage } from './pages/login.page.js';
import { OrganizationPage } from './pages/organization.page.js';
import { UsersPage } from './pages/users.page.js';

const credentials = {
  email: process.env.SUPERADMIN_EMAIL || 'staging@getbulkyy.com',
  password: process.env.SUPERADMIN_PASSWORD || 'StagingAdmin123.',
};

const login = async (page) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login(credentials.email, credentials.password);
};

test('0. Reject invalid super admin credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login(credentials.email, 'invalid-password');
  await loginPage.expectLoginError();
});

test.describe('Super admin scenarios', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('1. View dashboard metrics and performance', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.open();
    await dashboardPage.expectLoaded();
    await dashboardPage.searchPerformance('puli');
  });

  test('2. Filter users and reset a user password', async ({ page }) => {
    const usersPage = new UsersPage(page);
    await usersPage.open();
    await usersPage.expectLoaded();
    await usersPage.filterByRole('Regional leads2');
    await usersPage.filterByRole('Divisional leads2');
    await usersPage.filterByRole('Aggregators1');
    await usersPage.resetPassword({ cancel: true });
    await usersPage.resetPassword();
    await expect(page.getByText('Password reset. Temporary')).toBeVisible();
  });

  test('3. Open and validate the create-user form', async ({ page }) => {
    const usersPage = new UsersPage(page);
    await usersPage.open();
    await usersPage.openCreateUser();
    await usersPage.fillCreateUser({
      email: 'oluwatobilobaaluko+1@gmail.com',
      firstName: 'Aluko',
      lastName: 'Tobi',
      phone: '08121998731',
    });
    await usersPage.closeCreateUser();
  });

  test('4. Open a zone details page and return to zones', async ({ page }) => {
    const organizationPage = new OrganizationPage(page);
    await organizationPage.openZones();
    await organizationPage.openFirstZone();
    await organizationPage.expectZonesNavigation();
    await organizationPage.openZones();
  });

  test('5. Manage aggregator users and open a vendor', async ({ page }) => {
    const organizationPage = new OrganizationPage(page);
    await organizationPage.openAggregatorUsers();
    await organizationPage.openVendor();
  });

  test('6. Open commission rate scheduling', async ({ page }) => {
    const commissionsPage = new CommissionsPage(page);
    await commissionsPage.openRateScheduling();
    await commissionsPage.expectSchedulingOpen();
  });
});