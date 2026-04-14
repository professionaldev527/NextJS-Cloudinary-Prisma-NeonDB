# Project Context: Cloudinary SaaS (Video Processor)

This project is a Next.js-based SaaS application designed for video management and processing, leveraging Cloudinary for media transformations and NeonDB for data storage.

## 🛠 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Authentication**: [Clerk](https://clerk.com/)
- **Database ORM**: [Prisma](https://www.prisma.io/)
- **Database**: PostgreSQL (NeonDB)
- **Media Storage & Processing**: [Cloudinary](https://cloudinary.com/) (using `next-cloudinary` and `cloudinary` SDK)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📂 Project Structure

```text
├── app/
│   ├── (app)/             # Protected application routes (Sidebar layout)
│   │   ├── home/          # Main dashboard (Video feed with playback)
│   │   ├── social-share/  # Image/Social media asset transformations
│   │   └── video-upload/  # Video upload and metadata processing
│   ├── (auth)/            # Auth routes (Enhanced Sign-in, Sign-up)
│   ├── api/               # API Endpoints
│   │   ├── video-upload/  # Metadata record creation
│   │   └── videos/        # Fetch/Delete video operations (Cloudinary + DB)
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout (Clerk Provider)
│   └── page.tsx           # Landing Page
├── components/            # Shared UI components (VideoCard, etc.)
├── types/                 # TypeScript interfaces
├── prisma/                # Prisma schema and migrations
├── middleware.ts          # Clerk route protection & wildcard matching logic
└── tailwind.config.ts     # Tailwind & DaisyUI configuration
```

## 🗄 Database Schema

The core data model is the `Video` model:

```prisma
model Video {
    id             String   @id @default(cuid())
    title          String
    description    String?
    publicId       String   // Cloudinary Public ID
    originalSize   String
    compressedSize String
    duration       Float
    createdAt      DateTime @default(now())
    updatedAt      DateTime @updatedAt
}
```

## 🔑 Key Features

1.  **Fixed Authentication Flow**: Robust Clerk integration with optimized middleware supporting subpath verification (sign-up flow).
2.  **Complete Video Deletion**: Clean API implementation that removes records from both the Neon database and Cloudinary storage.
3.  **In-App Video Playback**: Enhanced dashboard where users can play videos directly within the card UI.
4.  **Social Media Asset Generation**: Multi-format image transformations using Cloudinary's AI-powered cropping.
5.  **Premium UI/UX**: DaisyUI-powered interface with dark mode, smooth transitions, and state-based action confirmations (no more manual alerts).

## 🚀 Development

```bash
npm install
npx prisma generate
npm run dev
```
