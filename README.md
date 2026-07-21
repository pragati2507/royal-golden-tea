# Royal Golden Mix Tea

Premium mobile-first landing page and secure order-collection system built with Next.js, TypeScript, Tailwind CSS, Supabase, and the App Router.

## Local development

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env.local`.
3. Add your Supabase project URL, anon key, and WhatsApp Business number.
4. Run `npm run dev` and open `http://localhost:3000`.

Quality checks:

```bash
npm run lint
npm run typecheck
npm run build
```

## Supabase project setup

1. Create a Supabase project.
2. Open **SQL Editor** in Supabase.
3. Run [`supabase/migrations/202607210001_create_order_system.sql`](supabase/migrations/202607210001_create_order_system.sql).
4. In **Project Settings → API**, copy the Project URL and anon/public key.
5. Add them to `.env.local` using the variables below.

The migration creates `customers`, `orders`, and `admin_users`; indexes; validation constraints; Row Level Security; and the `submit_order` function. Anonymous users can execute only that function. They cannot read, update, or delete customer or order records. The function saves the customer first and then creates the linked order in one transaction.

## Environment variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_WHATSAPP_BUSINESS_NUMBER=919876543210
```

The WhatsApp number must use country code and digits only, without `+`, spaces, or punctuation. No service-role key is used or exposed.

## Admin access setup

The `/admin` route is protected server-side with Supabase Auth and Row Level Security.

1. In Supabase, open **Authentication → Users → Add user**.
2. Create the administrator with an email and strong password.
3. Copy the new user UUID.
4. Run this in the Supabase SQL Editor, replacing the UUID:

```sql
insert into public.admin_users (user_id)
values ('YOUR_AUTH_USER_UUID');
```

5. Visit `/admin/login` and sign in with that account.

Only authenticated users listed in `admin_users` can read customers and orders. Removing the row immediately removes dashboard data access.

## Vercel configuration

In Vercel, open **Project → Settings → Environment Variables** and add all three variables for Production, Preview, and Development. Redeploy after saving them. No Supabase service-role key is required.

## Testing

- Submit a valid order and confirm a customer row is created before the linked order row.
- Try blank fields, a non-Indian mobile number, invalid PIN, and quantity `0`.
- Double-click submit and confirm only one request is sent.
- Confirm the success view contains the order number and complete summary.
- Confirm WhatsApp opens only after the customer clicks the confirmation button.
- Sign in at `/admin/login`, test search and status filtering, and export CSV.
- Confirm a signed-out visit to `/admin` redirects to `/admin/login`.
- Test at mobile, tablet, and desktop widths.

## Catalogue and pricing

Product options and prices live in `lib/bundles.ts`. Prices are intentionally `null` until the owner confirms them. Do not publish invented prices.

## Scope

Milestone 2 includes order collection and the protected admin dashboard. It does not include payment, Razorpay, Shiprocket, inventory automation, customer accounts, reviews, chatbots, analytics, or Milestone 3.
