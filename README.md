# 💡 Leenup – Frontend

Frontend de l'application **Leenup**, développé avec **Next.js** et **TypeScript**.  
Ce projet gère l’interface utilisateur de la plateforme et consomme les APIs back (REST ou GraphQL à venir).

---

## 🚀 Stack technique

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/)
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)
- [dotenv](https://github.com/motdotla/dotenv) pour les variables d’environnement

---

## 📁 Arborescence du projet

```txt
leenup-front/
├── app/ ou pages/         # Structure Next.js (App Router ou Pages Router)
├── components/            # Composants UI réutilisables
├── features/              # Dossiers métiers (auth, profil, etc.)
├── hooks/                 # Custom hooks React
├── lib/                   # Fonctions métier (API, auth, etc.)
├── public/                # Fichiers statiques
├── styles/                # Fichiers CSS (tailwind)
├── tests/                 # Tests unitaires par dossier
├── types/                 # Types TypeScript globaux
├── utils/                 # Fonctions utilitaires
├── .env.local             # Variables d’environnement (non commit)
├── jest.config.ts         # Config Jest
├── tailwind.config.ts     # Config Tailwind CSS
├── tsconfig.json          # Config TypeScript
└── ...
```

---

## ⚙️ Installation

```bash
git clone https://github.com/ton-org/leenup-front.git
cd leenup-front
npm install
```

---

## 🔧 Lancer le projet en dev

```bash
npm run dev
```

Accès : [http://localhost:3000](http://localhost:3000)

---

## 🧪 Tests

```bash
npm run test         # Lance les tests en watch
npm run test:coverage  # Affiche le taux de couverture
```

---

## 🧼 Lint & format

```bash
npm run lint
npm run format
```

> Les règles sont basées sur ESLint, TypeScript, Prettier, et Tailwind CSS.

---

## 🔐 Variables d'environnement

Créer un fichier `.env.local` à la racine :

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
JWT_SECRET=dev-secret
```

> Voir `.env.example` pour une base propre.

---

## ✅ Checklist dev

- [x] Projet initialisé avec Next.js + TS
- [x] Tailwind CSS configuré
- [x] ESLint / Prettier actifs
- [x] Jest + RTL opérationnels
- [x] Structure scalable par dossier

---

## 📌 À faire plus tard

- [ ] `lib/env.ts` pour centraliser les accès aux env vars
- [ ] CI/CD avec GitHub Actions
- [ ] Déploiement (Vercel ?)
- [ ] E2E tests avec Playwright ou Cypress
- [ ] Design System / Storybook ?

---

## 🧑‍💻 Auteur

Projet développé par l'équipe **Leenup**  
Frontend lead : **Clément ROLLIN**

---

## 📄 Licence

MIT – libre d’utilisation, contribution bienvenue.