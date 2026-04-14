import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    // Parse the JSON body sent from the frontend
    const body = await request.json();
    const {
      title,
      description,
      publicId,
      originalSize,
      compressedSize,
      duration,
    } = body;

    // Basic validation
    if (!publicId) {
      return NextResponse.json(
        { error: "Missing Cloudinary publicId" },
        { status: 400 },
      );
    }
    if (!title) {
      return NextResponse.json(
        { error: "Missing video title" },
        { status: 400 },
      );
    }

    // Save the record directly to the database
    const video = await prisma.video.create({
      data: {
        title,
        description: description || "",
        publicId,
        originalSize: String(originalSize),
        compressedSize: String(compressedSize),
        duration: Number(duration) || 0,
      },
    });

    return NextResponse.json(video);
  } catch (error: any) {
    console.error("[VIDEO_UPLOAD_ERROR] Detailed failure:", {
      message: error.message,
      stack: error.stack,
      body: body
    });
    return NextResponse.json(
      { error: "Failed to save video record to database", details: error.message },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
