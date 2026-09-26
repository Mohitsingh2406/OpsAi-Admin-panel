import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { db } from "@/lib/firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";

// Public endpoint - the marketing site's contact form posts here.
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, message, company } = body;

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email and message are required." },
      { status: 400 }
    );
  }

  await db()
    .collection("contactSubmissions")
    .add({
      name,
      email,
      company: company || "",
      message,
      read: false,
      createdAt: FieldValue.serverTimestamp(),
    });

  return NextResponse.json({ ok: true });
}

// Admin-only listing.
export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const snap = await db()
    .collection("contactSubmissions")
    .orderBy("createdAt", "desc")
    .get();
  const submissions = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return NextResponse.json({ submissions });
}
