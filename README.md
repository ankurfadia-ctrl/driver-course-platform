# Driver Course Platform

Virginia-first online driver improvement course platform built with Next.js, Supabase, and Stripe, with a multistate foundation for additional state rollouts later.

## Current capabilities

- State-based routing with Virginia configured first
- Student signup and login with Supabase Auth
- Protected Stripe checkout and paid course unlocking
- Lesson flow with seat-time tracking
- Final exam with identity verification and same-day retake lock
- Certificate generation and public certificate verification
- Mailed certificate copy ordering with later purchase support
- Student support request flow and admin support inbox
- Internal compliance dashboard for operations and approval prep
- Internal curriculum packet view for Virginia lesson and exam review
- State-driven disclosures and approval-safe public copy

## Required environment variables

Copy `.env.example` to `.env.local` and fill in:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_BASE_URL=http://localhost:3000
ADMIN_EMAILS=
EMAIL_PROVIDER=log
EMAIL_FROM=
RESEND_API_KEY=
PHYSICAL_MAIL_PROVIDER=log
LOB_API_KEY=
LOB_FROM_NAME=
LOB_FROM_ADDRESS_LINE1=
LOB_FROM_ADDRESS_LINE2=
LOB_FROM_ADDRESS_CITY=
LOB_FROM_ADDRESS_STATE=
LOB_FROM_ADDRESS_ZIP=
LOB_FROM_COUNTRY=US
```

## Notes on admin access

- `/admin/compliance`, `/admin/support`, `/admin/virginia-readiness`, `/admin/curriculum`, `/admin/operations`, and `/admin/launch-readiness` are protected by `ADMIN_EMAILS`
- `ADMIN_EMAILS` should be a comma-separated list of email addresses
- Admin pages use server-backed reads with the Supabase service role

## Notes on transactional email

- Purchase confirmation emails are triggered during checkout confirmation
- Completion emails are triggered manually from the unlocked certificate page
- If `EMAIL_PROVIDER=log`, emails are not actually sent; they are treated as log/no-op events
- If you want live delivery, set:
  - `EMAIL_PROVIDER=resend`
  - `EMAIL_FROM`
  - `RESEND_API_KEY`

## Notes on mailed certificate copies

- Students can order a mailed certificate copy from the unlocked certificate page
- The mailed copy is a separate paid add-on and can be purchased later
- The current mailed certificate order page shows:
  - price charged
  - estimated provider cost
  - estimated gross profit and margin
- If `PHYSICAL_MAIL_PROVIDER=log`, mailed certificate orders are recorded but not submitted to a real mail provider
- If you want automatic third-party mailing, set:
  - `PHYSICAL_MAIL_PROVIDER=lob`
  - `LOB_API_KEY`
  - `LOB_FROM_NAME`
  - `LOB_FROM_ADDRESS_LINE1`
  - `LOB_FROM_ADDRESS_CITY`
  - `LOB_FROM_ADDRESS_STATE`
  - `LOB_FROM_ADDRESS_ZIP`
  - optional `LOB_FROM_ADDRESS_LINE2`
  - optional `LOB_FROM_COUNTRY`

## Production launch

Before posting the site online:

- Set `NEXT_PUBLIC_BASE_URL` to the live `https://` domain, not `http://localhost:3000`
- Add production Supabase keys and production Stripe secret key in the host environment
- Set `ADMIN_EMAILS` for real admin accounts
- If you want live email sending, set:
  - `EMAIL_PROVIDER=resend`
  - `EMAIL_FROM`
  - `RESEND_API_KEY`
- Run a hosted smoke test for signup, checkout, course access, identity setup, final exam, certificate, support, and admin pages

You can also review current deployment status inside `/admin/launch-readiness`.
Use `/admin/qa-checklist` for the hosted smoke-test workflow and `/api/health` for a simple runtime status response.

## Development

Run the dev server:

```bash
npm run dev
```

Run lint:

```bash
npm run lint
```

Run production build:

```bash
npm run build
```

## Current priorities

- Virginia approval-readiness hardening
- Provider operations tooling
- Email automation finishing and delivery reliability
- Certificate and compliance polish
