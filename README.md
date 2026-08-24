# Bulkyy Super Admin QA

Playwright end-to-end tests for the Bulkyy Super Admin staging application.

## Requirements

- Node.js 18 or newer
- Access to the staging application
- Valid Super Admin credentials

## Installation

```bash
npm install
npx playwright install
```

## Configuration

The suite defaults to the staging application:

```text
https://sales.staging.getbulkyy.com
```

Override the defaults with environment variables when needed:

```powershell
$env:BASE_URL="https://sales.staging.getbulkyy.com"
$env:SUPERADMIN_EMAIL="your-email@example.com"
$env:SUPERADMIN_PASSWORD="your-password"
```

Do not commit real credentials or `.env` files.

## Running Tests

List all discovered tests without running them:

```bash
npx playwright test --list
```

Run the full browser matrix:

```bash
npx playwright test
```

Run Chromium only:

```bash
npx playwright test --project=chromium
```

Run a specific scenario:

```bash
npx playwright test -g "2. Filter users"
```

View the HTML report after a run:

```bash
npx playwright show-report
```

## Test Scenarios

The current suite is in `tests/example.spec.js` and contains:

1. Reject invalid Super Admin credentials
2. View dashboard metrics and performance
3. Filter users and reset a user password
4. Open and validate the create-user form
5. Open a zone details page and return to zones
6. Manage aggregator users and open a vendor
7. Open commission rate scheduling

Each authenticated scenario logs in independently through the shared setup hook.

## Project Structure

```text
tests/
  example.spec.js
  pages/
    login.page.js
    dashboard.page.js
    users.page.js
    organization.page.js
    commissions.page.js
playwright.config.js
package.json
```

Page Objects own selectors and reusable workflows. Test files own scenario intent and business assertions.

## Browser Projects

The Playwright configuration currently runs tests against:

- Chromium
- Firefox
- WebKit

The tests use a 45-second navigation timeout, a 15-second action timeout, and a 10-second assertion timeout to accommodate staging response times.
