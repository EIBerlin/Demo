# DO NOT RUN THIS PROJECT IN YOUR LOCAL ENVIRONMENT. IF YOU WANT TO CHECK IT OUT, PLEASE USE AN ISOLATED ENVIRONMENT

# SmartPay Dev Demo

Beautiful developer demo that showcases a sign-in / merchant checkout flow, wallet integrations, a mock backend API for auth and data, and Tailwind UI components.

This repository is a Create React App project enhanced with Tailwind CSS, a mock backend, Redux, and crypto wallet helpers (MetaMask/Ethers). The README below includes quick start instructions for Windows PowerShell, folder overview, common commands, and contribution tips.

## Quick links

- Live (development): http://localhost:3000
- Framework: Create React App
- Styling: Tailwind CSS
-- Auth & DB: Mock backend (in-memory)

## Prerequisites

- Node.js LTS (16.x or 18.x recommended)
- npm (comes with Node.js)
- Windows PowerShell (this repo's example commands target PowerShell)

Check your versions:

```powershell
node -v
npm -v
```

## Install & run (PowerShell)

1. Install dependencies

```powershell
npm install
```

2. Start the development server (the project includes a `postinstall` that runs start in some setups — you can still run it manually):

```powershell
npm start
```

Open http://localhost:3000 in your browser. The app will hot-reload on changes.

## Available npm scripts

- npm start — start dev server (react-scripts start)
- npm test — run tests (react-scripts test)
- npm run build — build production bundle (react-scripts build)
- npm run eject — eject CRA config (one-way)

Note: package.json currently contains a `postinstall` script that runs `npm start`. If you prefer to avoid automatically starting the dev server after install, remove or change that script in `package.json`.

## Project structure (important files)

- `src/` — source code
	- `components/` — React components (auth, checkout, dashboard, common)
	- `layouts/MainLayout.jsx` — top-level layout
	- (removed) `supabaseClient.jsx` — Supabase SDK init
	- `redux/` — Redux slices and store
	- `pages/` — route pages (Home, Checkout, Dashboard, Auth)
	- `App.js` / `index.js` — app entry points
- `tailwind.config.js` — Tailwind configuration
- `package.json` — scripts and dependencies

If you're exploring the codebase, start with `src/App.js` and `src/pages/Checkout.jsx` to see how the checkout flow and payment sources are wired.

## Wallets and EVM integration

This demo includes helpers for interacting with MetaMask and ethers. Look for `@metamask/detect-provider`, `ethers`, and `@metamask/logo` in dependencies. Tests and components reference wallet detection in `components/checkout`.

## Testing

Run tests with:

```powershell
npm test
```

The project uses React Testing Library and jest.

## Linting & formatting

This repo includes `eslint` and `prettier` in dependencies. Add or enable configs if you want CI linting. You can run prettier manually:

```powershell
npx prettier --check "src/**/*.{js,jsx,css,md}"
npx prettier --write "src/**/*.{js,jsx,css,md}"
```

## Deployment

Build the production bundle:

```powershell
npm run build
```

Then serve the `build/` folder with any static host (Netlify, Vercel, GitHub Pages with adapters, or a simple static server).

## Common troubleshooting

- If backend errors appear, check the server terminal (Express) and ensure `server/index.js` is running on port 4000.

## Contributing

- Uses a mock backend API, Tailwind CSS, and ethers
1. Fork and create a feature branch
2. Run tests and linting locally
3. Open a pull request describing the change

If you'd like help with a specific feature (example: add tests for checkout or add CI), open an issue and I can help implement it.

## License

This project doesn't include a license file. Add one (for example MIT) if you plan to publish or share this repository publicly.

## Acknowledgements

- Built from Create React App
- Uses Supabase, Tailwind CSS, and ethers

---

If you'd like, I can also:

- Add a `.env.example` showing the environment variables you need (without secrets)
- Add a short CONTRIBUTING.md and PR template
- Add basic GitHub Actions CI to run tests and lint on PRs

Tell me which of those you'd like next and I'll implement it.
