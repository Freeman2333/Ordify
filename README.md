# 🛒 Ordify - Wholesale Orders Application

Ordify is a React-based wholesale orders management system designed to streamline the creation, editing, and tracking of customer orders. It provides a clean interface for users to manage product details, billing, statuses, and totals efficiently.

---

## 🚀 Features

- View, filter, and manage wholesale orders
- Create and edit orders with dynamic product rows
- Auto-calculated totals (per line and per order)
- Mock API for local development and testing

---

## ⚙️ Tech Stack

| Category          | Tech                                                   |
| ----------------- | ------------------------------------------------------ |
| Framework         | [React 19](https://react.dev/)                         |
| State Management  | [Redux Toolkit 2.8.1](https://redux-toolkit.js.org/)   |
| Routing           | [React Router v7](https://reactrouter.com/en/main)     |
| Styling           | [Tailwind CSS](https://tailwindcss.com/)               |
| Forms             | [React Hook Form](https://react-hook-form.com/)        |
| Validation        | [Zod](https://zod.dev/)                                |
| API Communication | [RTK Query] (https://redux-toolkit.js.org/rtk-query/)  |
| Mock API          | [JSON Server](https://github.com/typicode/json-server) |

---

### 📦 Installation

git clone https://gitlab.codeit.pro/serhii.popov/ordify.git
cd ordify
npm install

## ▶️ Running the App

This project uses Vite for the development server and JSON Server to simulate a backend API.

### 🚀 Start Full App (Frontend + Mock API)

npm run start-app

## 🛠️ Environment Variables

| Variable     | Description                 | Mandatory | Example               |
| ------------ | --------------------------- | --------- | --------------------- |
| VITE_API_URL | Backend API URL for the app | Yes       | http://localhost:3010 |
