# Leenup Frontend

Interface web de la plateforme Leenup. L’application est construite avec **Vue 3**, **TypeScript**, **Pinia**, **Vue Router**, **TailwindCSS** et **Vite**.

## Prérequis

- Node.js 20.x (recommandé : gérer via [nvm](https://github.com/nvm-sh/nvm) ou Volta)
- npm 10.x (fourni avec Node 20)
- Dépendances Playwright (la CI Ubuntu les installe automatiquement via `postinstall`)

## Installation

```bash
git clone https://github.com/leenup/leenup-frontend.git
cd leenup-frontend
npm ci
```

### Variables d’environnement

Copiez le fichier `.env` vers `.env.local` (ou `.env.development`) et adaptez les valeurs :

```
VITE_API_BASE_URL=https://localhost
VITE_AUTH_LOGIN_PATH=/auth/login
VITE_AUTH_ME_PATH=/me
VITE_AUTH_REGISTER_PATH=/register
VITE_AUTH_CHANGE_PASSWORD_PATH=/me/change-password
VITE_AUTH_EMAIL_PATH=/auth/login/email
VITE_AUTH_GOOGLE_PATH=/auth/login/google
```

Toutes les vues et services (`src/services/auth.service.ts`) consomment ces variables via `import.meta.env`.

## Scripts npm

| Commande | Description |
| --- | --- |
| `npm run dev` | Démarre le serveur Vite avec HMR ([http://localhost:5173](http://localhost:5173)) |
| `npm run build` | Compile l’app (type-check + `vite build`, sortie dans `dist/`) |
| `npm run preview` | Sert le build pour QA locale |
| `npm run lint` | ESLint (config flat Vue + TS + Prettier) |
| `npm run format` | Formatage Prettier |
| `npm run typecheck` | Vérification stricte via `vue-tsc` |
| `npm run test` / `npm run test:unit` | Vitest en mode run |
| `npm run test:watch` | Vitest en watch |
| `npm run test:unit:report` | Vitest + export JUnit (`test-results/unit/junit.xml`) |
| `npm run test:e2e` | Playwright (assurez-vous qu’un serveur tourne ou que `playwright.config` le démarre) |

## Tests & rapports

- Les tests unitaires résident dans `tests/` (avec sous-dossier `tests/auth`).  
- `npm run test:unit:report` nettoie/alimente `test-results/unit/` via `scripts/prepare-test-results.mjs`.  
- Les tests E2E (`tests/e2e`) nécessitent un build ou un serveur `npm run dev`. Playwright est installé automatiquement à l’issue de `npm ci` (voir `postinstall`).

## Theming & design tokens

- La charte graphique (couleurs, rayons, ombres, typo, gradients) est centralisée dans `design-tokens.json`.
- `tailwind.config.js` consomme ces tokens et génère des classes (`bg-primary-500`, `shadow-e-200`, `rounded-400`, `bg-hero-gradient`, etc.).
- Les composants peuvent importer `designTokens` via `@/theme/tokens` pour accéder aux mêmes valeurs côté TypeScript.

## Contribution & workflow

1. Créez une branche `feat/...` ou `fix/...` depuis `develop`.
2. Implémentez vos changements puis exécutez localement :
   ```bash
   npm run lint
   npm run typecheck
   npm run test:unit
   npm run build
   ```
3. Poussez et ouvrez une PR vers `master`. La CI GitHub (`Frontend CI`) exécute lint, tests unitaires (avec upload des rapports) et build. Tant qu’un job échoue, la PR reste bloquée.

## Ressources utiles

- [Vue 3](https://vuejs.org/guide/introduction.html)
- [Pinia](https://pinia.vuejs.org/)
- [Vitest](https://vitest.dev/guide/)
- [TailwindCSS](https://tailwindcss.com/docs)
- [Playwright](https://playwright.dev/docs/intro)

En cas de question sur l’authentification ou la configuration, consultez `src/services/auth.service.ts`, `src/stores/auth.ts` et les tests associés dans `tests/auth/`. Bonne contribution !
