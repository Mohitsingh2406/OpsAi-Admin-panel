import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { db } from "@/lib/firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const snap = await db().collection("careers").orderBy("createdAt", "desc").get();
  const jobs = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return NextResponse.json({ jobs });
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { title, department, location, type, description, status } = body;

  if (!title) {
    return NextResponse.json({ error: "Title is required." }, { status: 400 });
  }

  const ref = await db()
    .collection("careers")
    .add({
      title,
      department: department || "",
      location: location || "",
      type: type || "Full-time",
      description: description || "",
      status: status === "closed" ? "closed" : "open",
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });

  return NextResponse.json({ id: ref.id });
}
