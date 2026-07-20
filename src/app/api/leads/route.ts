import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, serviceType, source, details } = body;

    // Validation
    if (!name || !phone || !serviceType || !source) {
      return NextResponse.json(
        { error: "Name, Phone Number, Service Category, and Lead Source are required." },
        { status: 400 }
      );
    }

    // Save lead to database using Prisma Client
    const newLead = await db.lead.create({
      data: {
        name,
        phone,
        email: email || null,
        serviceType,
        source,
        details: details || null,
      },
    });

    // Output mock email triggers to terminal
    console.log("-----------------------------------------");
    console.log(`[EMAIL DISPATCH] New Lead Captured from Source: ${source}`);
    console.log(`Lead Name: ${name}`);
    console.log(`Phone: ${phone}`);
    console.log(`Email: ${email || "None Provided"}`);
    console.log(`Service: ${serviceType}`);
    console.log(`Details: ${details || "None"}`);
    console.log("-----------------------------------------");

    return NextResponse.json(
      { success: true, lead: newLead },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("[LEAD API POST ERROR]:", error);
    return NextResponse.json(
      { error: "Internal server database error." },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("admin_session");

    if (!sessionCookie || sessionCookie.value !== "authenticated") {
      return NextResponse.json(
        { error: "Access Denied: Not authenticated." },
        { status: 401 }
      );
    }

    // Fetch all leads from Prisma
    const leads = await db.lead.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(leads, { status: 200 });
  } catch (error: any) {
    console.error("[LEAD API GET ERROR]:", error);
    return NextResponse.json(
      { error: "Internal server database error." },
      { status: 500 }
    );
  }
}
