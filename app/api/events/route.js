import { NextResponse } from "next/server";
import { insertEvent, normalizeTags } from "../../../lib/data";

export async function POST(request) {
  const formData = await request.formData();
  const title = formData.get("title");
  if (!title) {
    return NextResponse.json({ error: "Missing title" }, { status: 400 });
  }

  insertEvent({
    title,
    category: formData.get("category") || null,
    source_type: formData.get("source_type") || "community",
    organizer_name: formData.get("organizer_name") || null,
    location_name: formData.get("location_name") || null,
    address: formData.get("address") || null,
    lat: null,
    lng: null,
    start_time: formData.get("start_time")
      ? new Date(formData.get("start_time")).toISOString()
      : null,
    end_time: formData.get("end_time")
      ? new Date(formData.get("end_time")).toISOString()
      : null,
    cost_type: formData.get("cost_type") || "free",
    registration_url: formData.get("registration_url") || null,
    age_range: formData.get("age_range") || null,
    tags_json: JSON.stringify(normalizeTags(formData.get("tags"))),
    indoor: formData.get("indoor") ? 1 : 0,
    kid_friendly: formData.get("kid_friendly") ? 1 : 0,
    status: "pending"
  });

  return NextResponse.redirect(new URL("/weekend", request.url));
}
