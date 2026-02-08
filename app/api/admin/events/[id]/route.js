import { NextResponse } from "next/server";
import { updateEvent } from "../../../../lib/data";

export async function POST(request, { params }) {
  const url = new URL(request.url);
  const adminKey = process.env.ADMIN_KEY;
  const key = url.searchParams.get("key");
  if (!adminKey || key !== adminKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  updateEvent(params.id, {
    title: formData.get("title") || null,
    organizer_name: formData.get("organizer_name") || null,
    start_time: formData.get("start_time") || null,
    location_name: formData.get("location_name") || null,
    address: formData.get("address") || null,
    status: formData.get("status") || "pending"
  });

  return NextResponse.redirect(new URL(`/admin?key=${key}`, request.url));
}
