# Acadex Prototype

Acadex is a UAE-focused student marketplace prototype for browsing listings, posting items, and exploring community resources such as past papers, tutors, study groups, and campus events.

## Local server

When the app is running, open:

- [http://localhost:3000](http://localhost:3000)

## Run locally

Prerequisites:
- Node.js 20+

1. Open PowerShell inside this project folder
2. Run `npm.cmd install`
3. Create a `.env.local` file from `.env.example`
4. Add SMTP credentials so signup verification emails can be sent
5. Start the app with `npm.cmd run dev`
6. Open [http://localhost:3000](http://localhost:3000)

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

## Changing listing images manually

The seeded marketplace listings live in:

- [src/lib/demoListings.ts](C:\Users\Admin\Downloads\acadex---educational-classifieds\src\lib\demoListings.ts)

Each listing has an `image` field. Right now they point to sample image URLs. To replace them with your own pictures:

1. Put your image files in `public/listings/`
2. Use paths like:

```ts
image: '/listings/calculator.jpg'
image: '/listings/chemistry-book.png'
```

3. Save the file and refresh the app

For listings created from the Post Listing page, your uploaded image is already stored locally in the browser for the prototype.

## Manual GitHub upload in the browser

If you do not want to use git commands, you can upload the project manually on GitHub:

1. Create a new repository on GitHub
2. Open the new repository page
3. Click `Add file` -> `Upload files`
4. Drag the whole project contents into GitHub, except:
   - `.env.local`
   - `node_modules`
   - `dist`
5. Add a commit message like `Initial Acadex prototype`
6. Click `Commit changes`

## Public deployment for presentation day

If you want one public link that works from any device, the app should be deployed, not just uploaded to GitHub.

This project is prepared for Render deployment with:

- [render.yaml](C:\Users\Admin\Downloads\acadex---educational-classifieds\render.yaml)
- a production `start` script in [package.json](C:\Users\Admin\Downloads\acadex---educational-classifieds\package.json)
- support for host-provided `PORT` in [server.ts](C:\Users\Admin\Downloads\acadex---educational-classifieds\server.ts)

High-level Render steps:

1. Push this project to GitHub
2. Create a Render account
3. Click `New` -> `Blueprint` or `Web Service`
4. Connect your GitHub repository
5. Add these environment variables in Render:
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_USER`
   - `SMTP_PASS`
   - `MAIL_FROM`
6. Deploy
7. Render will give you a public URL like `https://acadex.onrender.com`
8. Put that public URL at the top of this README

For presentation day, that public URL is what you open on the other device. In that case you do not need to run `npm.cmd run dev` on the presentation laptop.

## Files not to upload

Do not upload:

- `.env.local`
- `node_modules`
- `dist`
