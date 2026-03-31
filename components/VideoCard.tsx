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

  const handleDownload = useCallback(() => {
    setIsDownloading(true);

    const downloadUrl = getCldVideoUrl({
      src: video.publicId,
      videoCodec: "auto",
      quality: "auto",
      rawTransformations: ["fl_attachment"],
    });

    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = `${video.title.replace(/\s+/g, "_")}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setIsDownloading(false);
  }, [video.publicId, video.title]);

  const handleDeleteClick = async () => {
    // Show a confirmation dialog before deleting
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this video?",
    );
    if (!confirmDelete) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/videos/${video.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete video");
      }

      // Notify parent component to remove this video from UI
      if (onDelete) {
        onDelete(video.id);
      }
    } catch (error) {
      console.error(error);
      alert("Error deleting video.");
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

  const thumbnailUrl = getCldImageUrl({
    src: video.publicId,
    format: "jpg",
    assetType: "video",
    rawTransformations: ["so_0"],
    width: 400,
    height: 300,
    crop: "fill",
    gravity: "auto",
  });

  return (
    <div className="card bg-base-100 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
      <figure className="relative h-48 w-full bg-base-200">
        <img
          src={thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-base-100/80 px-2 py-1 rounded-lg text-sm flex items-center gap-1 backdrop-blur-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {formatDuration(video.duration)}
        </div>
      </figure>

      <div className="card-body p-4">
        <h2 className="card-title text-lg font-bold truncate">{video.title}</h2>
        <p className="text-sm text-base-content/60 mb-4">
          Uploaded {getRelativeTime(video.createdAt)}
        </p>

        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
          <div className="flex flex-col">
            <span className="text-base-content/60 flex items-center gap-1">
              <svg
                className="text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              Original
            </span>
            <span className="font-semibold">{formatSize(originalSize)}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-base-content/60 flex items-center gap-1">
              <svg
                className="text-purple-500"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
                <path d="M12 12v6" />
                <path d="M8 16h8" />
              </svg>
              Compressed
            </span>
            <span className="font-semibold">{formatSize(compressedSize)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-sm font-semibold text-accent">
            Compression: {compressionPercent}%
          </span>

          <div className="flex items-center gap-2">
            {/* Delete Button */}
            <button
              className="btn btn-sm btn-error btn-outline"
              onClick={handleDeleteClick}
              disabled={isDeleting || isDownloading}
              title="Delete Video"
            >
              {isDeleting ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
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
                  <line x1="10" y1="11" x2="10" y2="17" />
                  <line x1="14" y1="11" x2="14" y2="17" />
                </svg>
              )}
            </button>

            {/* Download Button */}
            <button
              className="btn btn-sm btn-primary"
              onClick={handleDownload}
              disabled={isDownloading || isDeleting}
              title="Download Video"
            >
              {isDownloading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
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
