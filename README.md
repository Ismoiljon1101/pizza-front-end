# React App — Tailwind + shadcn/ui + Redux Toolkit

A modern React application built with React, TypeScript, Redux Toolkit, Tailwind CSS, and shadcn/ui.
The project has been fully refactored from older Material-UI & CSS styles into a clean, utility-first architecture.

---

## 🚀 Tech Stack

- **React + TypeScript**
- **Redux Toolkit** for global state
- **Tailwind CSS** for styling
- **shadcn/ui** for reusable components
- **ESLint + Prettier** for clean code
- **CRA (Create React App)** as the initial bootstrap

---

## 🔧 Available Scripts

### `Yarn start`

Runs the app in development mode at:
http://localhost:3000

### `Yarn run build`

Creates a production build inside `/build`.

### `Yarn test`

Launches the test runner.

---

## 🎨 Styling Setup

### Tailwind

Configured with:

- `tailwind.config.js`
- `postcss.config.js`
- Tailwind directives added to `index.css`

### shadcn/ui

Installed and configured.Components used across the project:

- Button
- Card
- Navigation Menu
- Sheet / Drawer
- Input
- Avatar
- Others as needed

---


Refactoring Summary (Completed)

- ✓ Installed & configured Tailwind CSS
- ✓ Added shadcn/ui
- ✓ Removed Material-UI fully
- ✓ Removed unused CSS
- ✓ Refactored components to Tailwind/shadcn:
  - HomeNavbar
  - OtherNavbar
  - Basket
  - App layout
- ✓ Fixed all compilation errors
- ✓ Application runs clean with no warnings

---

## 📦 Deployment

To generate optimized production files:

yarn run build

csharp
Copy code

Output is located in:

/build

yaml
Copy code

Use any static hosting (Vercel, Netlify, Nginx, S3, etc.).

---

## 📘 Learn More

- React Docs — https://react.dev
- Redux Toolkit — https://redux-toolkit.js.org
- Tailwind CSS — https://tailwindcss.com
- shadcn/ui — https://ui.shadcn.com
