import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id;

    if (!id) {
      return NextResponse.json(
        { error: "Video ID is required" },
        { status: 400 },
      );
    }

    // 1. Fetch the video record first to get the publicId
    const video = await prisma.video.findUnique({
      where: { id },
    });

    if (!video) {
      return NextResponse.json(
        { error: "Video not found" },
        { status: 404 },
      );
    }

    // 2. Delete the asset from Cloudinary
    // Note: resource_type 'video' is required for video files
    try {
      await cloudinary.uploader.destroy(video.publicId, {
        resource_type: "video",
      });
    } catch (cloudinaryError) {
      console.error("Cloudinary deletion error:", cloudinaryError);
      // We continue with DB deletion even if Cloudinary fails, 
      // or we could throw an error depending on desired strictness.
    }

    // 3. Delete the record from Neon database
    await prisma.video.delete({
      where: { id: id },
    });

    return NextResponse.json({ message: "Video deleted successfully from Cloudinary and database" });
  } catch (error: any) {
    console.error("Error during video deletion:", error);
    return NextResponse.json(
      { error: "Failed to delete video", details: error.message },
      { status: 500 },
    );
  }
}
