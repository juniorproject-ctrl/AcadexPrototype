# Acadex Prototype

Acadex is a UAE-focused student marketplace prototype for browsing listings, posting items, and exploring community resources such as past papers, tutors, study groups, and campus events.

## Live Demo

https://acadexprototype.onrender.com

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
