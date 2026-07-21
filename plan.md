## PartnerShip on TanStack Start + Lovable Cloud

Rebuilding the PHP/MySQL spec as a modern full-stack app: React + TanStack Start on the frontend, Lovable Cloud (Postgres + Auth + Storage + server functions) on the backend. Same feature surface — marketplace, resellers, commissions, admin analytics — but no PHP, no XAMPP.

Since the full scope is huge (3 role dashboards, cart/checkout, subscriptions, referrals, commissions, withdrawals, reports, notifications), I'll ship it in phases so you get a working app early and can steer each next slice.

### Phase 1 — Foundation (this build)

**Design system & public site**
- Blue/purple SaaS theme, semantic tokens in `src/styles.css`
- Public pages: Home, About, Products, Product Details, Pricing, How It Works, FAQ, Contact
- Shared marketing nav + footer

**Auth (Lovable Cloud)**
- Email/password + Google sign-in
- `/auth` page (login + register tabs), forgot/reset password
- Role-based redirect after login → user / reseller / admin dashboard
- Roles stored in a separate `user_roles` table with `has_role()` security-definer function (never on profiles — prevents privilege escalation)
- Profile auto-created on signup via trigger

**Database schema (migration)**
- `profiles`, `user_roles` (enum: admin, reseller, user)
- `categories`, `products` (with commission_percent, status, images)
- `subscription_plans` (monthly/quarterly/half-yearly/yearly)
- `cart_items`, `orders`, `order_items`
- `subscriptions`, `subscription_renewals`
- `payments`, `referrals`, `commissions`, `withdrawal_requests`
- `notifications`, `contact_messages`, `activity_logs`, `settings`
- Full RLS + GRANTs on every table, indexes on FKs

**User dashboard (basic)**
- Browse products, product details, add to cart, cart page, simulated checkout, order history

### Phase 2 — Reseller & Commissions
Referral link generator, click/signup/purchase tracking, commission ledger (pending/approved/paid), withdrawal requests, sales history.

### Phase 3 — Admin
Analytics dashboard with Recharts (revenue, sales, monthly orders, subscription analytics), CRUD for users/resellers/products/categories/orders, approve/reject withdrawals, settings.

### Phase 4 — Subscriptions, notifications, reports
Active/expired subscriptions, renewal flow, next billing date, notification center, PDF/Excel export for sales/revenue/product/user/subscription/commission reports.

### Technical notes

- Stack: TanStack Start v1, React 19, Tailwind v4, shadcn/ui, Recharts (not Chart.js — better React fit), Lovable Cloud (Postgres + Auth).
- Payments are **simulated** as requested (no Stripe integration in this build).
- Server logic via `createServerFn` (typed RPC); no edge functions needed.
- Protected routes under `src/routes/_authenticated/`; role gates via `has_role()` RPC in server fns.
- PDF export via `jspdf` + `jspdf-autotable`, Excel via `xlsx` — both work in-browser.

### What I'll do right after you approve

1. Enable Lovable Cloud
2. Write the full schema migration (all 20 tables + RLS + roles + trigger)
3. Build the design system + public marketing pages
4. Build auth (email/password + Google) with role-based redirect
5. Build the user dashboard slice (browse → cart → checkout → orders)

Then I'll hand back for you to try it and pick the next phase.
