# gov.pl Playwright Tests

## ✅ Purpose

Automated Playwright tests for verifying the basic functionality of [gov.pl](https://www.gov.pl/)

## Scope of Testable Features

1. Search
   Central search box for finding information and services.

2. User-targeted Tabs
   “Dla Obywatela”, “Dla Przedsiębiorcy”, “Dla Urzędnika”, “Dla Rolnika”. Each opens dedicated content.

3. Filtering search
   Filter searched information.

5. Responsiveness
   Mobile-first design and cross-browser testing

## ⚖️ Legal Constraints & Best Practices

These tests are read-only. Do not run them due to the automation prevention on gov.pl (captcha etc.)
❗ Automating these in production may violate data protection laws (e.g., GDPR) and terms of service.

Normally, UI tests are run repeatedly (e.g., CI pipelines), but for gov.pl we intentionally limit testing on production to prevent:

- Overloading government infrastructure
- Legal or privacy breaches
- Unintended data submissions

Recommended Practices:
Run full test suites in dev/staging where possible.

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

Check the results:

```bash
npx playwright show-report
```

### 3. Use different environment

```bash
BASE_URL=https://gov.pl npx playwright test
```

## 🔧 Best Practices

- Use of test.step() for better traceability in test reports
- Tests are isolated and repeatable
- Using Playwright recommended locators (getByRole, getByPlaceholder)
- Environment configurable via `BASE_URL`
- Descriptive test names and grouped with `test.describe`
- Clear assertions verifying key page elements
- Parallel execution
- CI with test report storage in GitHub Pages (currently dummy disabled by adding a condition to run only on `never-activated-branch`)
- Page Object Pattern: page definitions in pages/, test logic in tests/ - for readability and maintenance

## 🔄 Future Enhancements

- Lighthouse performance analysis
- WCAG tests, potentially with `@axe-core/playwright`
