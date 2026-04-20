# ☕ Brewhaus — Artisan Café Website

A **complete, production-ready** café website built with Next.js 14, Tailwind CSS, Framer Motion, Firebase, and Stripe.

---

## 📁 Complete File Structure

```
brewhaus/
├── src/
│   ├── app/
│   │   ├── globals.css                     # Global styles, CSS vars, dark mode
│   │   ├── layout.tsx                      # Root layout — fonts, providers, navbar
│   │   ├── loading.tsx                     # App-wide loading UI
│   │   ├── not-found.tsx                   # 404 page
│   │   ├── global-error.tsx                # Global error boundary
│   │   ├── robots.ts                       # robots.txt
│   │   ├── sitemap.ts                      # Dynamic sitemap
│   │   ├── page.tsx                        # Home / landing page
│   │   ├── menu/
│   │   │   └── page.tsx                    # Menu — filter, search, grid
│   │   ├── about/
│   │   │   └── page.tsx                    # Brand story, values, team
│   │   ├── contact/
│   │   │   └── page.tsx                    # Contact form, locations
│   │   ├── cart/
│   │   │   └── page.tsx                    # Full cart page
│   │   ├── checkout/
│   │   │   ├── page.tsx                    # Multi-step checkout + Stripe Elements
│   │   │   └── success/
│   │   │       └── page.tsx                # Post-payment confirmation
│   │   ├── orders/
│   │   │   └── page.tsx                    # Order history (real-time)
│   │   ├── profile/
│   │   │   └── page.tsx                    # User profile, edit name
│   │   ├── terms/
│   │   │   └── page.tsx                    # Terms & Conditions
│   │   ├── privacy/
│   │   │   └── page.tsx                    # Privacy Policy
│   │   ├── auth/
│   │   │   ├── layout.tsx                  # Split-screen auth layout
│   │   │   ├── login/page.tsx              # Sign in — email + Google
│   │   │   └── signup/page.tsx             # Create account
│   │   └── api/
│   │       ├── create-payment-intent/
│   │       │   └── route.ts                # POST /api/create-payment-intent
│   │       └── webhook/
│   │           └── route.ts                # POST /api/webhook (Stripe events)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx                  # Sticky navbar, dark mode toggle, cart badge
│   │   │   └── Footer.tsx                  # Site footer
│   │   ├── home/
│   │   │   ├── Testimonials.tsx            # Reviews section
│   │   │   └── Newsletter.tsx              # Email signup
│   │   ├── menu/
│   │   │   ├── MenuCard.tsx                # Drink card — quick-add + detail modal
│   │   │   └── DrinkDetail.tsx             # Slide-up drink detail sheet
│   │   ├── cart/
│   │   │   ├── CartDrawer.tsx              # Slide-in cart sidebar
│   │   │   └── StripeCheckoutForm.tsx      # Stripe PaymentElement wrapper
│   │   └── ui/
│   │       ├── Button.tsx                  # Reusable button variants
│   │       ├── Input.tsx                   # Reusable input with icons
│   │       ├── Badge.tsx                   # Status/label badges
│   │       ├── Modal.tsx                   # Accessible modal dialog
│   │       ├── Skeleton.tsx                # Loading skeletons
│   │       ├── ScrollToTop.tsx             # Floating scroll-to-top button
│   │       └── OrderStatusTracker.tsx      # Visual order progress stepper
│   ├── hooks/
│   │   ├── useAuth.tsx                     # Firebase auth context + session cookie
│   │   ├── useOrders.ts                    # Real-time order listener
│   │   ├── useLocalStorage.ts              # Type-safe localStorage hook
│   │   └── useScrollTop.ts                 # Scroll position hook
│   ├── lib/
│   │   ├── firebase.ts                     # Firebase app, auth, firestore
│   │   ├── menuData.ts                     # 20 menu items across 4 categories
│   │   └── utils.ts                        # cn(), formatPrice(), formatDate()
│   ├── store/
│   │   └── cartStore.ts                    # Zustand cart — persistent, SSR-safe
│   ├── middleware.ts                       # Route protection (cookie-based)
│   └── types/
│       ├── index.ts                        # MenuItem, CartItem, Order, UserProfile
│       └── env.d.ts                        # TypeScript env var declarations
├── .env.local.example                      # Environment variable template
├── .eslintrc.json
├── .gitignore
├── firebase.json                           # Firebase hosting + firestore config
├── firestore.indexes.json                  # Composite indexes
├── firestore.rules                         # Security rules
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── tsconfig.json
```

---

## 🚀 Quick Start (5 minutes)

### Step 1 — Install dependencies

```bash
cd brewhaus
npm install
```

### Step 2 — Create Firebase project

1. Go to **[console.firebase.google.com](https://console.firebase.google.com)**
2. **Create project** → name it (e.g. `brewhaus-cafe`) → Continue
3. **Authentication** → Get started → Sign-in method:
   - Enable **Email/Password**
   - Enable **Google** (add your support email)
4. **Firestore Database** → Create database → Start in **test mode** → choose region
5. **Project Settings** (gear icon) → **Your apps** → Add app → Web (`</>`)
   - Register app (name: "Brewhaus Web") → copy the config object

### Step 3 — Set up environment variables

```bash
cp .env.local.example .env.local
```

Open `.env.local` and fill in every value:

```env
# ── Firebase ───────────────────────────────────────────────
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890

# ── Stripe (Test Mode) ─────────────────────────────────────
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51XXXXXXXXXXXXXXXXXXXXXX
STRIPE_SECRET_KEY=sk_test_51XXXXXXXXXXXXXXXXXXXXXX
STRIPE_WEBHOOK_SECRET=whsec_XXXXXXXXXXXXXXXXXXXXXX

# ── App ────────────────────────────────────────────────────
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 4 — Set up Stripe (test mode)

1. Go to **[dashboard.stripe.com](https://dashboard.stripe.com)** → create free account
2. Make sure you're in **Test mode** (toggle top-right)
3. **Developers** → **API keys** → copy Publishable key + Secret key
4. **Developers** → **Webhooks** → Add endpoint:
   - URL: `http://localhost:3000/api/webhook` (for local) or your Vercel URL
   - Events to listen: `payment_intent.succeeded`, `payment_intent.payment_failed`
   - Copy the **Signing secret** → paste as `STRIPE_WEBHOOK_SECRET`

For local webhook testing, install Stripe CLI:
```bash
brew install stripe/stripe-cli/stripe   # macOS
stripe login
stripe listen --forward-to localhost:3000/api/webhook
```

### Step 5 — Apply Firestore security rules

```bash
npm install -g firebase-tools
firebase login
firebase use --add   # pick your project
firebase deploy --only firestore:rules,firestore:indexes
```

### Step 6 — Run the dev server

```bash
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** — your café is live!

---

## 🔥 Feature Checklist

| Page / Feature                  | Route                      | Status |
|---------------------------------|----------------------------|--------|
| Home (hero, featured, CTA)      | `/`                        | ✅     |
| Menu with filters + search      | `/menu`                    | ✅     |
| Drink detail modal              | (overlay on menu)          | ✅     |
| About page                      | `/about`                   | ✅     |
| Contact form                    | `/contact`                 | ✅     |
| Sign in (email + Google)        | `/auth/login`              | ✅     |
| Sign up                         | `/auth/signup`             | ✅     |
| Cart drawer                     | (overlay, all pages)       | ✅     |
| Full cart page                  | `/cart`                    | ✅     |
| Multi-step checkout             | `/checkout`                | ✅     |
| Stripe PaymentElement           | `/checkout` (step 2)       | ✅     |
| Order saved to Firestore        | On payment success         | ✅     |
| Checkout confirmation           | `/checkout/success`        | ✅     |
| Order history (real-time)       | `/orders`                  | ✅     |
| Order status tracker            | `/orders` + success page   | ✅     |
| User profile + edit name        | `/profile`                 | ✅     |
| Terms & Conditions              | `/terms`                   | ✅     |
| Privacy Policy                  | `/privacy`                 | ✅     |
| Dark / Light mode               | Navbar toggle              | ✅     |
| Persistent cart (localStorage)  | Zustand persist            | ✅     |
| Framer Motion animations        | Throughout                 | ✅     |
| Mobile-first responsive         | Throughout                 | ✅     |
| Route protection (middleware)   | `/profile`, `/orders`      | ✅     |
| SEO sitemap + robots.txt        | `/sitemap.xml`, `/robots`  | ✅     |
| Scroll-to-top button            | All pages                  | ✅     |
| Testimonials section            | Home page                  | ✅     |
| Newsletter signup               | Home page                  | ✅     |
| 404 page                        | `/anything-missing`        | ✅     |

---

## 🎨 Design System

**Fonts**
- Display: `Cormorant Garamond` — editorial, luxurious
- Body: `DM Sans` — clean, modern, readable
- Mono: `DM Mono` — prices and order numbers

**Colour palette** (defined in `tailwind.config.js`)

| Token | Hex | Usage |
|-------|-----|-------|
| `cream-500` | `#e2b455` | Primary accent, CTAs |
| `espresso-800` | `#3d2416` | Dark backgrounds, buttons |
| `espresso-950` | `#0f0805` | Darkest (dark mode bg) |
| `cream-50` | `#fefdf8` | Light mode background |

**Dark mode** is class-based. Toggled via the moon/sun icon in the Navbar. Preference saved to `localStorage`.

---

## 🧪 Test Stripe Payments

Use these Stripe test card numbers:

| Scenario | Card number | Expiry | CVC |
|----------|-------------|--------|-----|
| Success | `4242 4242 4242 4242` | Any future | Any |
| Decline | `4000 0000 0000 0002` | Any future | Any |
| 3D Secure | `4000 0025 0000 3155` | Any future | Any |

---

## 🚢 Deployment

### Option A: Vercel (Recommended — 2 minutes)

```bash
npm install -g vercel
vercel

# When prompted:
# - Framework: Next.js (auto-detected)
# - Build command: npm run build
# - Output dir: .next (default)
```

Then in the **Vercel Dashboard → Settings → Environment Variables**, add all variables from your `.env.local`.

Update `NEXT_PUBLIC_APP_URL` to your Vercel URL (e.g. `https://brewhaus.vercel.app`).

Update your Stripe webhook URL to `https://brewhaus.vercel.app/api/webhook`.

### Option B: Firebase Hosting (Static)

Add `output: 'export'` to `next.config.js`, then:

```bash
npm run build
firebase deploy --only hosting
```

Note: API routes (Stripe) won't work with static export. Use Vercel or a Node server.

---

## 🔧 Customisation Guide

### Add / edit menu items
→ `src/lib/menuData.ts` — each item has: `id`, `name`, `description`, `price`, `category`, `image`, `tags`, `popular`, `calories`

### Change brand colours
→ `tailwind.config.js` → `theme.extend.colors`

### Change café name / copy
→ `src/app/layout.tsx` (metadata), `src/components/layout/Navbar.tsx`, `src/components/layout/Footer.tsx`

### Change fonts
→ `src/app/layout.tsx` — swap Google Font imports and variable names

### Add more pages
→ Create `src/app/your-page/page.tsx` — it's automatically routed by Next.js

### Style the Stripe form
→ `src/components/cart/StripeCheckoutForm.tsx` → `appearance` object in `<Elements>`

---

## 🏗 Architecture Notes

- **Authentication**: Firebase Auth client-side. A lightweight session cookie (`brewhaus_session`) enables Next.js middleware to redirect unauthenticated users from protected routes before the page renders.
- **Cart**: Zustand store, persisted to `localStorage` via the `persist` middleware. Cart state survives page refreshes and is shared across all components.
- **Orders**: Written to Firestore on payment success. The `useOrders` hook uses `onSnapshot` for real-time updates — status changes appear instantly without polling.
- **Payments**: Stripe PaymentElement handles the full card form. The server creates a PaymentIntent (`/api/create-payment-intent`), returns the `clientSecret`, and the client confirms. The Stripe webhook (`/api/webhook`) listens for `payment_intent.succeeded` to update the Firestore order status.

---

## 📦 Full Tech Stack

| Library | Version | Purpose |
|---------|---------|---------|
| `next` | 14.2 | React framework, App Router, API routes |
| `react` + `react-dom` | 18.3 | UI library |
| `tailwindcss` | 3.4 | Utility-first CSS |
| `framer-motion` | 11 | Animations, gestures |
| `firebase` | 10.11 | Auth + Firestore database |
| `zustand` | 4.5 | Lightweight state (cart) |
| `@stripe/stripe-js` | 3.3 | Stripe browser SDK |
| `@stripe/react-stripe-js` | 2.7 | Stripe React components |
| `stripe` | server | Stripe server SDK (API routes) |
| `react-hot-toast` | 2.4 | Toast notifications |
| `lucide-react` | 0.372 | Icon library |
| `clsx` + `tailwind-merge` | latest | Class name utilities |
| `typescript` | 5.4 | Type safety |

