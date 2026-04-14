import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// PREVENT NEXT.JS FROM CACHING THIS ROUTE AT BUILD TIME
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const videos = await prisma.video.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(videos);
  } catch (error: any) {
    console.error("[VIDEOS_FETCH_ERROR] Failure:", {
      message: error.message,
      stack: error.stack
    });
    return NextResponse.json(
      { error: "Error fetching videos", details: error.message },
      { status: 500 },
    );
  }
}
