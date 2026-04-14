import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[120px] animate-pulse animate-delay-1000"></div>
      </div>
      
      <div className="relative z-10 w-full flex flex-col items-center justify-center p-4">
        {/* Professional Header - Helps users know which page they are on */}
        <div className="mb-8 text-center animate-fade-in">
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
             Cloudinary <span className="text-primary">Showcase</span>
          </h1>
          <p className="text-slate-400 text-sm uppercase tracking-widest font-semibold">
            Authentication Portal
          </p>
        </div>

        <div className="w-full flex justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}
