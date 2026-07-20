import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { passcode } = await req.json();

    const targetPasscode = process.env.ADMIN_PASSCODE;

    if (!targetPasscode) {
      console.error("[AUTH ERROR]: ADMIN_PASSCODE environment variable is not set.");
      return NextResponse.json(
        { error: "Server misconfiguration. Admin access disabled." },
        { status: 500 }
      );
    }

    if (passcode !== targetPasscode) {
      return NextResponse.json(
        { error: "Access Denied: Invalid passcode." },
        { status: 403 }
      );
    }

    // Set a secure, HTTP-only cookie to maintain the session
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("[LOGIN API ERROR]:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
