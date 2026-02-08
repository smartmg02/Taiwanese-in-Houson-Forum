import { NextResponse } from "next/server";
import { insertVisitReport } from "../../../lib/data";

export async function POST(request) {
  const formData = await request.formData();
  const eventId = formData.get("event_id");
  if (!eventId) {
    return NextResponse.json({ error: "Missing event_id" }, { status: 400 });
  }

  insertVisitReport({
    event_id: Number(eventId),
    attended: Number(formData.get("attended") || 0),
    rating: formData.get("rating") ? Number(formData.get("rating")) : null,
    actual_cost: formData.get("actual_cost") ? Number(formData.get("actual_cost")) : 0,
    crowd_level: formData.get("crowd_level") || null,
    kid_friendly: Number(formData.get("kid_friendly") || 0),
    notes: formData.get("notes") || ""
  });

  return NextResponse.redirect(new URL(`/weekend/${eventId}`, request.url));
}
