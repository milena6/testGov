# gov.pl Playwright Tests

## ✅ Purpose

Automated Playwright tests for verifying the basic functionality of [gov.pl](https://www.gov.pl/) with support for switching to different environments (e.g., dev/staging).

Scope of Testable Features

1. Search
   Central search box for finding information and services.

✅ Tested: typing a query, navigating to the results page, and verifying category filters.

2. User-targeted Tabs
   “Dla Obywatela”, “Dla Przedsiębiorcy”, “Dla Urzędnika”, “Dla Rolnika”—each opens dedicated content.

✅ Tested: clicking each tab → URL change → visible relevant content.

3. Public-Service Catalog
   Display of government services (e‑Prescription, 500+, registrations).

✅ Tested: presence of at least one service card and valid link functionality.

4. Public Forms (Unauthenticated)
   Client-side validated forms accessible to public users.

✅ Tested: filling and validating forms, and working through to the authentication gate.

5. Responsiveness & Accessibility (WCAG)
   Mobile-first design with ARIA roles and accessibility features.

✅ Tested: UI functionality across viewport sizes and accessible element presence.

⚖️ Legal Constraints & Best Practices
Authenticated-only features (like “Mój GOV.PL”, ePUAP, e-ID) involve personal data and are behind login.
❗ Automating these in production may violate data protection laws (e.g., GDPR) and terms of service.

Normally, UI tests are run repeatedly (e.g., CI pipelines), but for gov.pl we intentionally limit testing on production to prevent:

Overloading government infrastructure

Legal or privacy breaches

Unintended data submissions

Recommended Practices:

Run full test suites in dev/staging where possible.

If running against production, restrict to essential smoke tests and minimize frequency.

Never automate login-required workflows in production to avoid legal complications.

🔧 Best Practices
Locators built using Playwright-recommended patterns (getByRole, getByPlaceholder)

Separation of concerns: Page definitions in pages/, test logic in tests/

Use of test.step() for better traceability in test reports

## 📂 Project Structure

```
.
├── pages
│   └── govHomePage.ts
├── tests
│   └── govHome.spec.ts
├── utils
│   └── consts.ts
└── README.md
```

## 🚀 How to Run

### 1. Install dependencies

```bash
npm install
```

### 2. Run tests

For headless mode:

```bash
npx playwright test
```

For headed mode:

```bash
npx playwright test --ui
```

### 3. Use different environment

```bash
BASE_URL=https://gov.pl npx playwright test
```

## 🔧 Best Practices

- Page Object Model with pure functions
- Use of test.step() for better traceability in test reports
- Tests are isolated and repeatable
- Using Playwright recommended locators
- Environment configurable via `BASE_URL`
- Descriptive test names and grouped with `test.describe`
- Clear assertions verifying key page elements
- Parallel execution & CI

## 🔄 Future Enhancements

- Lighthouse performance analysis
- WCAG tests with `@axe-core/playwright`
