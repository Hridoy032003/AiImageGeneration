// src/app/api/user/me/route.js (for App Router)
import { getAuthSession } from "@/lib/auth"; // Your NextAuth.js session helper
import { db } from "@/lib/db"; // Your Prisma client
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const session = await getAuthSession(); // Reads session cookie automatically

    if (!session?.user?.id) {
      // If not authenticated or user ID is missing
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch user data, specifically including the credits
    const user = await db.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        id: true,
        name: true, // Include other fields you might need
        email: true,
        credits: true, // CRITICAL: Fetch the credits
      },
    });

    if (!user) {
      // User not found in DB (shouldn't happen if session is valid, but good to check)
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return plain JSON object
    return NextResponse.json(user, { status: 200 });

  } catch (error) {
    console.error("API Error in /api/user/me:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}