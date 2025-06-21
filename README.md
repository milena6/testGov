# gov.pl Playwright Tests

## ✅ Purpose

Automated Playwright tests for verifying the basic functionality of [gov.pl](https://www.gov.pl/)

## Scope of Testable Features

1. Search
   Central search box for finding information and services.

2. User-targeted Tabs
   “Dla Obywatela”, “Dla Przedsiębiorcy”, “Dla Urzędnika”, “Dla Rolnika”—each opens dedicated content.

3. Public-Service Catalog
   Display of government services (e‑Prescription, 500+, registrations).

4. Public Forms (Unauthenticated)
   Client-side validated forms accessible to public users.

5. Responsiveness
   Mobile-first design

## ⚖️ Legal Constraints & Best Practices

Authenticated-only features (like “Mój GOV.PL”, ePUAP, e-ID) involve personal data and are behind login.
❗ Automating these in production may violate data protection laws (e.g., GDPR) and terms of service.

Normally, UI tests are run repeatedly (e.g., CI pipelines), but for gov.pl we intentionally limit testing on production to prevent:

- Overloading government infrastructure
- Legal or privacy breaches
- Unintended data submissions

Recommended Practices:
Run full test suites in dev/staging where possible.
Never automate login-required workflows in production to avoid legal complications.

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
- Using Playwright recommended locators (getByRole, getByPlaceholder)
- Environment configurable via `BASE_URL`
- Descriptive test names and grouped with `test.describe`
- Clear assertions verifying key page elements
- Parallel execution & CI
- Page Object Pattern: page definitions in pages/, test logic in tests/

## 🔄 Future Enhancements

- Lighthouse performance analysis
- WCAG tests with `@axe-core/playwright`
