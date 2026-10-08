# Employee Dashboard

An ERP-style admin front end built with **Angular 21** and **TypeScript**. It covers three business screens (employee attendance, buy orders and warehouse stock) built on a small in-house UI kit, with English and Arabic translation files wired in through ngx-translate.

The data is mocked in the components, so the project focuses on the front-end layer: reusable components, content projection, typed models and a token-based SCSS design system.

## Screens

| Route | Screen | What it shows |
| :--- | :--- | :--- |
| `/dashboard` | Current employees | Searchable, paginated attendance table with check-in/out times, locations and status badges |
| `/buy-orders` | Buy orders | Order items table with search, PG/colour/size/shade filters and a create-order modal |
| `/warehouse` | Warehouse | Stock items with dimensions, reorder levels, required vs. available quantities, bulk selection and an item details modal |

## Shared UI kit

Everything under `src/app/shared/ui` is a standalone component exported from one barrel (`shared/ui/index.ts`), so screens import only what they use:

- **`ui-data-table`**: panel, search box, configurable filters (`FilterConfig[]`), pagination, and three projected slots (`#headerActions`, `#tableContent`, `#footerActions`) so each screen supplies its own rows and actions.
- **`ui-modal`**, **`ui-button`**, **`ui-card`**, **`ui-panel`**, **`ui-form-field`**, **`ui-status-badge`**: the building blocks the screens compose.

## Styling and i18n

- SCSS split into partials under `src/styles/`: global design tokens, base, layout, table, patterns and utilities, using BEM class names (`data-table__th--center`).
- `@ngx-translate/core` is configured with an HTTP loader for `public/i18n/en.json` and `public/i18n/ar.json`; moving the remaining hard-coded template strings onto the `translate` pipe is the next step.

## Tech stack

Angular 21 (standalone components, new control flow) · TypeScript · RxJS · SCSS · ngx-translate · Vitest

## Getting started

Requires Node.js 20+.

```bash
git clone https://github.com/AhmedGamalFarouk/employee-dashboard.git
cd employee-dashboard
npm install
npm start          # ng serve, then open http://localhost:4200
```

Other scripts:

```bash
npm run build      # production build into dist/
npm test           # unit tests with Vitest
```

## Project structure

```
src/
├── app/
│   ├── dashboard/        # employee attendance screen
│   ├── buy-orders/       # buy orders screen
│   ├── warehouse/        # warehouse stock screen
│   ├── shared/ui/        # reusable UI kit (data table, modal, button, ...)
│   ├── app.routes.ts
│   └── app.config.ts     # router, HttpClient, translation providers
├── styles/               # design tokens and SCSS partials
public/
└── i18n/                 # en.json, ar.json
```

## Author

**Ahmed Gamal Farouk**, Front-End & Cross-Platform Mobile Developer · [GitHub](https://github.com/AhmedGamalFarouk) · [LinkedIn](https://www.linkedin.com/in/ahmed-gamal-farouk)
