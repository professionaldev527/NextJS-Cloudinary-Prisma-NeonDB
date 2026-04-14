# Cloudinary SaaS - Video Processor

A powerful Next.js application for video management, automatic compression, playback, and social media asset generation.

## 🚀 Key Features

- **Authentication**: Secure login and sign-up powered by Clerk.
- **Video Processing**: Automatic video compression and metadata extraction via Cloudinary.
- **Interactive Dashboard**: View, play, download, and delete videos with a premium UI.
- **Social Share**: Transform images into optimal formats for Instagram, Twitter, and Facebook.
- **Database**: Metadata storage using Prisma and NeonDB.

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **CSS**: Tailwind CSS + DaisyUI
- **Auth**: Clerk
- **Database**: Neon (PostgreSQL) + Prisma
- **Media**: Cloudinary

## ⚙️ Environment Variables

Create a `.env.local` file with the following:

```env
DATABASE_URL=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/home
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/home
```

## 📦 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Generate Prisma client**:
   ```bash
   npx prisma generate
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
