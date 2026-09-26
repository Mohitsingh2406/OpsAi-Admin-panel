# OpsAI Control Center

A production-style Next.js admin console for opsai.co.in. The experience is intentionally aligned with the public OpsAI language: connect, understand, govern, control, observe and improve — while keeping the actual admin responsibilities focused on website content, contacts, careers, applications, media, SEO and system health.

## What is included

- Premium dark enterprise UI with OpsAI-inspired visual language
- Command Center dashboard with metrics, traffic, system pulse, activity and sample AI estate
- Blog CMS: create/edit/delete and draft/published workflow
- Contact inbox with read/unread handling
- Careers and applications views
- Media Library demo
- SEO & page inventory demo
- Activity / audit-style event stream
- System Health view
- Admin settings view
- Signed JWT admin session
- Firestore persistence
- Large deterministic demo seed: 12 blogs, 10 careers and 10 contacts
- Firebase service-account JSON support for local development (recommended)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` from `.env.example`.

Recommended local Firebase setup:

```env
ADMIN_EMAIL=admin@opsai.co.in
ADMIN_PASSWORD=change-this-password
SESSION_SECRET=replace-with-a-long-random-secret
FIREBASE_SERVICE_ACCOUNT_FILE=./firebase-service-account.json
```

3. In Firebase Console, create a new Firebase Admin service-account key. Put the downloaded JSON file in the project root as:

```text
firebase-service-account.json
```

Do not commit this file. It is already covered by `.gitignore`.

4. Seed the demo data:

```bash
npm run seed
```

The seed is idempotent for the demo records. It writes 12 blog posts, 10 career postings and 10 contact submissions using stable demo IDs, so running it again updates the sample records instead of endlessly duplicating them.

5. Start the app:

```bash
npm run dev
```

Then open `http://localhost:3000/login`.

## Firebase environment-variable alternative

If you do not want to use the JSON file, you can instead configure:

```env
FIREBASE_PROJECT_ID=...
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

The Firebase loader normalizes quoted keys, literal `\n` characters and Windows line endings.

## Routes

- `/login` — secure admin login
- `/admin` — OpsAI Command Center
- `/admin/activity` — activity stream
- `/admin/blog` — blog management
- `/admin/contact` — contact inbox
- `/admin/careers` — career management
- `/admin/applications` — application review demo
- `/admin/media` — media library demo
- `/admin/seo` — SEO/page inventory demo
- `/admin/system` — service health and operational checks
- `/admin/settings` — admin preferences

## Security

Never paste a Firebase service-account private key into chat, source control or client-side code. If a private key has been exposed, revoke it and generate a new one. Keep `.env.local` and the service-account JSON outside version control.
