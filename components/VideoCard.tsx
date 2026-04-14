"use client";

import React, { useCallback, useState } from "react";
import { getCldImageUrl, getCldVideoUrl } from "next-cloudinary";

interface Video {
  id: string;
  title: string;
  description: string;
  publicId: string;
  originalSize: string;
  compressedSize: string;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
}

interface VideoCardProps {
  video: Video;
  onDelete?: (id: string) => void;
}

// Helpers
const formatSize = (bytes: number) => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const getRelativeTime = (date: Date) => {
  const diff = new Date().getTime() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  return "Just now";
};

export default function VideoCard({ video, onDelete }: VideoCardProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = useCallback(() => {
    setIsDownloading(true);
    setError(null);

    try {
      const downloadUrl = getCldVideoUrl({
        src: video.publicId,
        quality: "auto",
        rawTransformations: ["fl_attachment"],
      });

      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = `${video.title.replace(/\s+/g, "_")}.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      setError("Download failed");
    } finally {
      setIsDownloading(false);
    }
  }, [video.publicId, video.title]);

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);
    try {
      const response = await fetch(`/api/videos/${video.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete video");
      }

      if (onDelete) {
        onDelete(video.id);
      }
    } catch (error) {
      console.error(error);
      setError("Delete failed");
      setShowDeleteConfirm(false);
    } finally {
      setIsDeleting(false);
    }
  };

  const originalSize = Number(video.originalSize);
  const compressedSize = Number(video.compressedSize);
  const compressionPercent =
    originalSize > 0
      ? Math.round((1 - compressedSize / originalSize) * 100)
      : 0;

  const [isPlaying, setIsPlaying] = useState(false);

  const thumbnailUrl = getCldImageUrl({
    src: video.publicId,
    format: "jpg",
    assetType: "video",
    rawTransformations: ["so_0"],
    width: 600,
    height: 450,
    crop: "fill",
    gravity: "auto",
  });

  const videoUrl = getCldVideoUrl({
    src: video.publicId,
    quality: "auto",
  });

  return (
    <div className="card bg-base-100 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-base-200">
      <figure className="relative h-64 w-full bg-slate-900 group cursor-pointer" onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? (
          <video
            src={videoUrl}
            controls
            autoPlay
            className="w-full h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <>
            <img
              src={thumbnailUrl}
              alt={video.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
              <div className="bg-primary text-white p-4 rounded-full shadow-2xl transform transition-transform group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </>
        )}
        
        <div className="absolute bottom-2 right-2 bg-base-100/90 px-2 py-1 rounded-lg text-sm font-bold flex items-center gap-1 backdrop-blur-md shadow-sm">
          <svg className="text-primary" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          {formatDuration(video.duration)}
        </div>
      </figure>

      <div className="card-body p-5">
        <h2 className="card-title text-xl font-bold truncate leading-tight">{video.title}</h2>
        <p className="text-xs text-base-content/50 mb-4 font-medium uppercase tracking-wider">
          {getRelativeTime(video.createdAt)}
        </p>

        <div className="grid grid-cols-2 gap-4 text-sm mb-6 bg-base-200/50 p-3 rounded-xl border border-base-300">
          <div className="flex flex-col">
            <span className="text-base-content/60 text-[10px] uppercase font-bold mb-1">Original</span>
            <span className="font-bold flex items-center gap-1">
               <svg className="text-blue-400" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2h-8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
               {formatSize(originalSize)}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-base-content/60 text-[10px] uppercase font-bold mb-1">Compressed</span>
            <span className="font-bold flex items-center gap-1 text-success">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2h-8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="m9 15 2 2 4-4"/></svg>
              {formatSize(compressedSize)}
            </span>
          </div>
        </div>

        {error && (
          <div className="text-error text-xs mb-3 font-bold animate-pulse flex items-center gap-1">
             <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
             {error}
          </div>
        )}

        <div className="flex items-center justify-between mt-auto">
          <div className="badge badge-accent badge-outline font-bold text-[10px] px-2">
            PROCESSED: {compressionPercent}%
          </div>

          <div className="flex items-center gap-2">
            {showDeleteConfirm ? (
              <div className="flex gap-1 animate-in fade-in slide-in-from-right-2">
                <button
                  className="btn btn-xs btn-error font-bold"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? "..." : "Confirm"}
                </button>
                <button
                  className="btn btn-xs btn-ghost text-[10px]"
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={isDeleting}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                className="btn btn-sm btn-circle btn-ghost text-error hover:bg-error/10"
                onClick={() => setShowDeleteConfirm(true)}
                disabled={isDeleting || isDownloading}
                title="Delete Video"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
              </button>
            )}

            <button
              className="btn btn-sm btn-circle btn-primary shadow-lg shadow-primary/20"
              onClick={handleDownload}
              disabled={isDownloading || isDeleting || showDeleteConfirm}
              title="Download Video"
            >
              {isDownloading ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
