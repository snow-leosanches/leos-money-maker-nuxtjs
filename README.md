# Leo's Money Maker

A demo SaaS app for investing: stocks, crypto, 401(k), and 529 plans in one place. Built with [Nuxt](https://nuxt.com) and [Nuxt UI](https://ui.nuxt.com).

## What’s implemented

### Landing & navigation

- **Landing page** (`/`) — Hero, services (Stocks, Crypto, 401(k), 529), features, pricing strip, trust/security, CTA.
- **Navbar** — Logo, Invest / Crypto / Retirement / Pricing (each goes to its own page), Log in, Dashboard (when logged in), Log out, Open account (→ login).
- **Footer** — Same four product links and Open account → login.
- **404 / error page** — Themed error page with Back to home and optional Go to dashboard.

### Auth

- **Login** (`/login`) — Three demo customer types: Stock investor, Crypto customer, 401(k) & 529 investor. Choice is stored in `localStorage` and used for dashboard and product access.
- **Protected routes** — `/dashboard` and below require login; unauthenticated users are redirected to `/login`. Logged-in users hitting `/login` are redirected to `/dashboard`.

### Dashboard

- **Dashboard** (`/dashboard`) — Role-specific view:
  - **Stock** — Ticker strip, portfolio panel (15 stocks, total value), watchlist. Links to stock detail pages.
  - **Crypto** — Four wallets (BTC, BCH, LTC, ETH) with mock live prices, 24h % change, and sparklines (mock stream, no real WebSocket).
  - **Retirement** — 401(k) and 529 allocation cards with fund names and percentages; “Modify fund selection” links to the funds page.
- **“Product added” banner** — When arriving with `?added=invest`, `?added=crypto`, or `?added=retirement`, a dismissible banner says the product was added and may take up to 48 hours to activate.

### Invest (stocks)

- **Portfolio** — 15 stocks with quantities persisted in `localStorage`; shared prices via composable (dashboard and detail stay in sync).
- **Stock search** — Autocomplete from S&P 500 / Dow (and optional NASDAQ) via `public/data/stocks.json` (see `scripts/build-stocks.mjs`).
- **Stock detail** (`/dashboard/stock/[symbol]`) — For any symbol in portfolio or search data: name, price, position, Buy / Sell / Sell All; non-portfolio symbols get a lazy price and can be bought to create a position.
- **Invest product page** (`/invest`) — If user has Invest (stock customer): service details + “Go to dashboard”. If not: benefits + “Sign up” (and “Log in to add Invest” when logged out). “Sign up” → `/dashboard?added=invest`.

### Crypto

- **Crypto dashboard** — Cards for BTC, BCH, LTC, ETH with balance, USD value, 24h % and sparklines; data from mock stream (no Binance).
- **Crypto product page** (`/crypto`) — Same pattern as Invest: details when user has Crypto, add-service + Sign up (and login when logged out) otherwise. “Sign up” → `/dashboard?added=crypto`.

### Retirement & education

- **Retirement dashboard** — 401(k) and 529 allocation with fund names and percentages from `useRetirementAllocation` (persisted in `localStorage`).
- **Modify fund selection** (`/dashboard/retirement/funds`) — Separate page: add/remove fund slots, pick funds from Fidelity/Vanguard/Morningstar-style lists (401(k) and 529), set allocation %; dropdowns exclude already-selected funds to avoid duplicates. Save updates state and redirects to dashboard.
- **Retirement product page** (`/retirement`) — Same pattern: details when user has Retirement, add-service + Sign up otherwise. “Sign up” → `/dashboard?added=retirement`.

### Pricing

- **Pricing page** (`/pricing`) — All services listed with plans:
  - **Stocks & ETFs** — Starter ($0), Growth ($4.99/mo), Pro ($19.99/mo).
  - **Crypto** — Standard (1% spread), Plus (0.5%), Pro (0.25%).
  - **401(k) & IRA** — Starter ($0), Growth ($2/mo), Employer (custom).
  - **529** — Direct ($0), Managed (0.25% AUM), Premium (0.15% AUM).

### Other behavior

- All “Open account” / “Open an account” buttons and links point to `/login`.
- Route rules: `/dashboard` and `/dashboard/**` use `ssr: false` so hard refresh works correctly with client-side auth.

## Tech stack

- **Nuxt 4** — Vue 3, file-based routing, composables.
- **Nuxt UI 4** — Components (UButton, UCard, UModal, USelectMenu, UAlert, etc.), theme (green primary, slate neutral).
- **TypeScript** — Typed composables and pages.
- **Tailwind CSS** — Via Nuxt UI and `app/assets/css/main.css`.
- **Icons** — Lucide via `@iconify-json/lucide`.

## Project structure (high level)

- `app/app.vue` — App shell (header, nav, footer, SEO).
- `app/pages/` — `index`, `login`, `pricing`, `invest`, `crypto`, `retirement`, `dashboard/index`, `dashboard/stock/[symbol]`, `dashboard/retirement/funds`.
- `app/components/` — DashboardStock, DashboardCrypto, DashboardRetirement, PortfolioPanel, StockSearchBar, SiteNav, AppLogo.
- `app/composables/` — useAuth, usePortfolio, useStockTicker, useStockSearch, useCryptoWallets, useBinanceCryptoStream (mock), useRetirementAllocation.
- `app/data/` — `retirement-funds.ts` (401k and 529 fund options).
- `app/middleware/auth.global.ts` — Protects `/dashboard`, redirects login/dashboard as needed.
- `app/plugins/auth.client.ts` — Rehydrates auth from `localStorage`.
- `scripts/build-stocks.mjs` — Builds `public/data/stocks.json` for stock search.

## Setup

Install dependencies:

```bash
pnpm install
# or: npm install / yarn install
```

Build stock search data (optional; used for autocomplete):

```bash
pnpm run build:stocks
```

## Development

Start the dev server (e.g. `http://localhost:3000` or the port Nuxt reports):

```bash
pnpm dev
```

## Production

Build:

```bash
pnpm build
```

Preview production build:

```bash
pnpm preview
```

## Scripts

| Script           | Description                          |
|------------------|--------------------------------------|
| `pnpm dev`       | Start development server             |
| `pnpm build`     | Production build                     |
| `pnpm preview`   | Preview production build locally     |
| `pnpm run build:stocks` | Generate `public/data/stocks.json` |
| `pnpm lint`      | Run ESLint                           |
| `pnpm typecheck` | Run Vue/TS type check                |

## License

See [LICENSE](LICENSE).
