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
git clone [https://github.com/yourusername/cloudinary-saas.git](https://github.com/yourusername/cloudinary-saas.git)
cd cloudinary-saas
