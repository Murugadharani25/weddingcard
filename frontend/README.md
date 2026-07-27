# WeddingKart — E-Commerce Frontend (Create React App)

React 18 + Tailwind + Create React App storefront + admin console for WeddingKart,
a wedding shopping platform for Bride and Groom product lines. Ships wired to
**mock in-memory data** so it runs standalone before your Django backend exists —
flip one env var to switch to the real API.

## Quick Start

```bash
npm install
npm start
```

Opens at http://localhost:3000 — you'll land on the customer login screen.

### Demo logins

| Area     | Username | Password   |
|----------|----------|------------|
| Customer | priya    | priya123   |
| Admin    | admin    | admin123   |

Admin console is at `/admin-login` (linked from the bottom of the customer login page).
New customers can also register from scratch at `/register`.

## Switching from mock data to your real Django API

1. Open `.env` (already present with defaults) or copy `.env.example` to `.env`.
2. Set `REACT_APP_API_BASE_URL` to your Django API root (e.g. `http://localhost:8000/api`).
3. Set `REACT_APP_USE_MOCK=false`.
4. Restart `npm start` — CRA only reads `.env` at server start.
5. Make sure your DRF endpoints match the paths already called in `src/services/*.js`
   (e.g. `GET /products/`, `POST /orders/`, `POST /auth/admin/login/`). Adjust the URLs
   in the service files if your backend uses different routes.
6. Implement JWT login at `/auth/customer/login/` and `/auth/admin/login/`, both returning
   `{ access, user }` — the app already attaches the token to every request and redirects
   to the right login page on a 401.

## Project Structure

```
public/
  index.html
src/
  index.js
  App.jsx           Routes + providers (Auth, Cart, Toast)
  /components        Shared UI — split into storefront (Navbar, CartDrawer, ProductCard,
                     CustomerLayout) and admin (AdminSidebar, AdminNavbar, AdminLayout,
                     StatCard) pieces, plus fully shared ones (Table, Modal, ProtectedRoute)
  /pages
    Login.jsx, Register.jsx, AdminLogin.jsx
    /customer         Home, Categories, ProductDetail, Cart, Checkout,
                      OrderConfirmation, MyOrders
    /admin            Dashboard, AdminProducts, AdminOrders, AdminCustomers, AdminReports
  /context          AuthContext (customer + admin login), CartContext, ToastContext
  /services         authService, categoryService, productService, orderService,
                    customerService, reportService
  /hooks            useAuth, useCart, useToast
  /utils            formatters
  /data             mockData.js — delete once the real API is wired up
```

## Modules Implemented

- **Auth** — separate Customer and Admin login paths, customer self-registration,
  JWT-ready, role-based route guards
- **Storefront** — Home/landing, Bride & Groom category browsing with sub-category filters,
  product detail, persistent cart (drawer + full page), checkout with shipping form and a
  stubbed payment step, order confirmation, order history
- **Admin Console** — dashboard (revenue, pending orders, recent orders), product CRUD
  (assign to Bride/Groom + sub-category), order management (status updates, delete),
  customer list, sales report with a revenue trend chart, top products, and CSV export

## Design Notes

The customer storefront and admin console intentionally use two different visual
languages — a warm wine/gold/ivory palette for the shopping experience, and a cooler
slate/teal palette for the admin tool — since they're different audiences using the
product for different reasons. Tailwind tokens for both live in `tailwind.config.js`.

## Notes for Trainers / Next Steps

- The mock service layer (`services/*.js`) mirrors exactly what the real Axios calls will
  look like — read the mock branch to understand the intended request/response shape,
  then swap it out.
- Stock validation happens at checkout (mirrors what the Django backend should also enforce
  server-side — never trust the frontend check alone).
- "Secure Checkout" is stubbed (card/UPI/COD selector, no real gateway) per the original
  brief — swap in Razorpay/Stripe when ready by extending `orderService.createOrder`.
