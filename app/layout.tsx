import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cloudinary Video Showcase | SaaS Platform",
  description: "Next-generation video management, compression, and social media asset generator powered by Cloudinary and NeonDB.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      afterSignInUrl="/home"
      afterSignUpUrl="/home"
    >

    <html lang="en" data-theme="dark">
      <body className={inter.className}>{children}</body>
    </html>
    </ClerkProvider>
  );
}
