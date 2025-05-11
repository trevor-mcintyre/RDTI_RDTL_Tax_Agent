
# 🧠 RDTI R&D Tax Credit App

This application helps organizations manage, structure, and submit their R&D tax credit claims effectively using Firebase and React.

---

## 🚀 Getting Started

### 1. Clone and Install
```bash
git clone <your-repo-url>
cd <your-repo-folder>
npm install
```

### 2. Configure Environment
Create a `.env` file in the root directory based on `.env.example`:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### 3. Start Local Dev Server
```bash
npm run start
```

---

## 🔐 Authentication
- Google Sign-In is enabled using Firebase Auth.
- `/dashboard`, `/claims`, and other routes are protected using `RequireAuth`.
- Admin access is determined by an allowlist in `RoleContext.jsx`.

---

## 💾 Firebase Setup

Ensure your Firebase project has:
- Firestore enabled
- Firebase Auth with Google Sign-In enabled
- Firestore rules from `firestore.rules`

---

## 🧪 Testing & Linting

```bash
npm run lint     # Run ESLint
npm run test     # Run unit tests
```

---

## 🛠 Deployment

This app is preconfigured for deployment on **Vercel**.

Ensure the following secrets are set in your GitHub repo:
- `VERCEL_TOKEN`
- `ORG_ID`
- `PROJECT_ID`

Or deploy manually via Vercel CLI.

---

## 📦 Structure

| Directory | Purpose |
|----------|---------|
| `src/pages/` | Main app pages |
| `src/components/` | Reusable UI components |
| `src/context/` | Context providers |
| `src/utils/` | Utility functions |
| `scripts/` | Admin and helper scripts |
| `functions/` | Firebase cloud functions |

---

## 📄 Legal Pages

- `/terms` — Terms of Service
- `/privacy` — Privacy Policy

---

## 📝 Notes
- Use `react-toastify` for non-intrusive notifications.
- `localStorage` persistence is available via `useDraftState.js`.

