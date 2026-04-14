import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-base-100">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex flex-col text-center space-y-8">
        <h1 className="text-6xl font-extrabold tracking-tight">
          Cloudinary <span className="text-primary">Showcase</span>
        </h1>
        <p className="text-xl text-base-content/70 max-w-2xl">
          The ultimate platform for video management, compression, and social media asset generation.
        </p>
        <div className="flex gap-4">
          <Link href="/sign-up" className="btn btn-primary btn-lg">
            Get Started
          </Link>
          <Link href="/home" className="btn btn-outline btn-lg">
            Explore Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
