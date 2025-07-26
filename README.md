# Grocery Management System (GMS)

A modern, responsive web application for managing grocery inventory, categories, and orders. Built with React, TypeScript, Material UI, and a clean, scalable architecture.

---

## Features

- **Responsive Layout**: Sidebar navigation with mobile and desktop support
- **Inventory Management**: Add, update, delete, and view inventory items
- **Category Management**: View and manage product categories
- **Order Management**: View orders and order details
- **Global State Management**: Cart and notification state via React Context API
- **API Integration**: Modular API layer for backend communication (CRUD operations)
- **Persistent State**: Sidebar and cart state persist across reloads
- **Beautiful Notifications**: Global error/success notifications using Material UI Snackbar
- **TypeScript**: Full type safety across the codebase

---

## Project Structure

```
gms-frontend/
├── public/                # Static assets
├── src/
│   ├── api/               # API modules (inventory, category, orders, config)
│   ├── components/        # Reusable UI components (Sidebar, CartIcon, etc.)
│   ├── context/           # React Contexts (Cart, Notification)
│   ├── hooks/             # Custom React hooks (usePersistedState)
│   ├── pages/             # Page components (Inventory, Category, Orders, Cart)
│   ├── styles/            # CSS files
│   ├── App.tsx            # Main app component
│   └── index.tsx          # Entry point
├── package.json
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm (v8+ recommended)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/deepakrajpal27/gms.git
   cd gms-frontend
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables:**
   - Create a `.env` file in the root of `gms-frontend/` (optional)
   - Example:
     ```env
     REACT_APP_API_BASE_URL=http://localhost:8080/api
     ```

### Running the App

```sh
npm start
```
- The app will be available at [http://localhost:3000](http://localhost:3000)

---

## API Layer

- All API endpoints are defined in `src/api/`.
- The base URL is configured in `src/api/config.ts` and can be set via the `REACT_APP_API_BASE_URL` environment variable.
- Example usage:
  ```typescript
  import { getInventory } from './api/inventoryApi';
  const items = await getInventory();
  ```

---

## State Management & Persistence

- **Cart and Sidebar State**: Managed via React Context and `usePersistedState` hook (localStorage-backed)
- **Notifications**: Use `useNotification()` to show global messages
- **Example:**
  ```typescript
  const { showNotification } = useNotification();
  showNotification('Item added!', 'success');
  ```

---

## Customization & Extensibility

- Add new API modules in `src/api/`
- Add new pages in `src/pages/`
- Add new context providers in `src/context/`
- Use Material UI theming for custom styles

---

## Scripts

- `npm start` — Start the development server
- `npm run build` — Build for production
- `npm test` — Run tests
- `npm run lint` — Lint the codebase (if configured)

---

## Author

- [Deepak]
- [deepakrajpal27@gmail.com]
