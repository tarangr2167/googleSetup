// src/app/api/auth/google/route.ts
import { NextRequest, NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

export async function POST(req: NextRequest) {
  try {
    const { idToken } = await req.json();
    console.log("idToken", idToken);

    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    });

    console.log("ticket", ticket);

    const payload = ticket.getPayload();
    console.log("payload", payload);
    const email = payload?.email;
    const name = payload?.name;
    const picture = payload?.picture;
    console.log("email", email);
    console.log("name", name);
    console.log("picture", picture);

    // 🔐 TODO: create or find user in your DB

    // ✅ Respond with session or JWT token
    return NextResponse.json({
      success: true,
      user: { email, name, picture },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Invalid token" },
      { status: 401 }
    );
  }
}
