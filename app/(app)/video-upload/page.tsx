"use client";

import React, { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function VideoUploadPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleUploadSuccess = async (result: any) => {
    if (!result || !result.info) return;

    setIsSaving(true);
    const fileDetails = result.info;

    // Because we bypass Vercel's limits with a direct client-side upload, Cloudinary
    // returns the original file size immediately. Video compression happens asynchronously.
    // We estimate the compressed size (Cloudinary usually reduces video size by ~40-50%).
    const estimatedCompressedSize = Math.round(fileDetails.bytes * 0.6);

    try {
      await axios.post("/api/video-upload", {
        title,
        description,
        publicId: fileDetails.public_id,
        originalSize: fileDetails.bytes.toString(),
        compressedSize: estimatedCompressedSize.toString(),
        duration: fileDetails.duration || 0,
      });

      router.push("/home");
    } catch (error) {
      console.error("Failed to save to database", error);
      alert(
        "Upload succeeded, but failed to save video details to the database.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Upload Video</h1>

      <div className="space-y-6 bg-base-200 p-8 rounded-xl shadow-lg">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-semibold">Video Title *</span>
          </label>
          <input
            type="text"
            placeholder="Enter title"
            className="input input-bordered w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isSaving}
            required
          />
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-semibold">Description</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-24 w-full"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isSaving}
          ></textarea>
        </div>

        <div className="mt-8 pt-4">
          {!title.trim() ? (
            <button className="btn btn-primary w-full" disabled>
              Enter a title to enable upload
            </button>
          ) : (
            <CldUploadWidget
              uploadPreset="next_app_preset"
              onSuccess={handleUploadSuccess}
              options={{
                resourceType: "video",
                maxFiles: 1,
                folder: "video-uploads",
                clientAllowedFormats: ["mp4", "webm", "mov", "avi"],
              }}
            >
              {({ open }) => {
                return (
                  <button
                    className="btn btn-primary w-full"
                    onClick={() => open()}
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <span className="loading loading-spinner">Saving...</span>
                    ) : (
                      "Select & Upload Video"
                    )}
                  </button>
                );
              }}
            </CldUploadWidget>
          )}
        </div>
      </div>
    </div>
  );
}
