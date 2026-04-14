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
=======
# Cloudinary AI-Powered SaaS

An AI-powered video management and sharing Software-as-a-Service (SaaS) application built with a modern web stack. This platform allows users to upload videos, automatically compress them using Cloudinary, manage their video library, and easily share media to social platforms.

## 🚀 Tech Stack

This project is built using the following modern technologies:

* **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
* **Authentication:** [Clerk](https://clerk.com/)
* **Database:** [NeonDB](https://neon.tech/) (Serverless PostgreSQL)
* **ORM:** [Prisma](https://www.prisma.io/)
* **Media Storage & AI Processing:** [Cloudinary](https://cloudinary.com/) & `next-cloudinary`
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/)
* **Icons:** [Lucide React](https://lucide.dev/)

## ✨ Features

* **Secure Authentication:** User sign-up, sign-in, and protected routing managed by Clerk.
* **Video Management:** Upload, store, and manage videos through a dedicated dashboard.
* **Smart Compression:** Automatically compress videos using Cloudinary and track original vs. compressed file sizes.
* **Social Sharing:** Dedicated social sharing features for generating ready-to-use formats.
* **Responsive UI:** Beautiful, accessible, and highly responsive user interface built with DaisyUI and Tailwind CSS.
* **Robust API:** Secured internal API routes for handling video metadata and uploads.

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed and set up:
* [Node.js](https://nodejs.org/) (v18 or higher)
* A [Clerk](https://clerk.com/) account for authentication.
* A [Cloudinary](https://cloudinary.com/) account for media storage and processing.
* A [NeonDB](https://neon.tech/) (or any PostgreSQL) database.

## 💻 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/professionaldev527/NextJS-Cloudinary-Prisma-NeonDB.git
cd /NextJS-Cloudinary-Prisma-NeonDB.git
