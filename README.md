# Acadex Prototype

Acadex is a UAE-focused student marketplace prototype for browsing listings, posting items, and exploring community resources such as past papers, tutors, study groups, and campus events.

## Run locally

Prerequisites:
- Node.js 20+

1. Install dependencies with `npm install`
2. Create a `.env.local` file from `.env.example`
3. Add SMTP credentials so signup verification emails can be sent
4. Start the app with `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000)

## Email verification setup

The signup flow sends a 4-digit email verification code through SMTP. Add these values to `.env.local`:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `MAIL_FROM`

Example:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=yourprojectemail@gmail.com
SMTP_PASS=your-app-password
MAIL_FROM="Acadex <yourprojectemail@gmail.com>"
```

If you use Gmail, create an app password first and use that instead of your normal Gmail password.
