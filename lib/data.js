const { db } = require("./db");

function nowIso() {
  return new Date().toISOString();
}

function normalizeTags(tags) {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags.filter(Boolean);
  return String(tags)
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function getWeekendRange() {
  const chicagoNow = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Chicago" })
  );
  const day = chicagoNow.getDay();
  const daysUntilSaturday = (6 - day + 7) % 7;
  const saturday = new Date(chicagoNow);
  saturday.setDate(chicagoNow.getDate() + daysUntilSaturday);
  saturday.setHours(0, 0, 0, 0);
  const sunday = new Date(saturday);
  sunday.setDate(saturday.getDate() + 1);
  sunday.setHours(23, 59, 59, 999);
  return {
    start: saturday.toISOString(),
    end: sunday.toISOString(),
    labelStart: saturday.toLocaleDateString("en-US", {
      timeZone: "America/Chicago",
      month: "short",
      day: "numeric"
    }),
    labelEnd: sunday.toLocaleDateString("en-US", {
      timeZone: "America/Chicago",
      month: "short",
      day: "numeric"
    })
  };
}

function listEvents(filters = {}) {
  const clauses = ["status = 'approved'"];
  const params = {};
  if (filters.source_type) {
    clauses.push("source_type = :source_type");
    params.source_type = filters.source_type;
  }
  if (filters.weekendOnly) {
    clauses.push("start_time >= :weekend_start");
    clauses.push("start_time <= :weekend_end");
    params.weekend_start = filters.weekendStart;
    params.weekend_end = filters.weekendEnd;
  }
  if (filters.freeOnly) {
    clauses.push("cost_type = 'free'");
  }
  if (filters.kidFriendly) {
    clauses.push("kid_friendly = 1");
  }
  if (filters.indoor) {
    clauses.push("indoor = 1");
  }
  if (filters.search) {
    clauses.push("(title LIKE :search OR organizer_name LIKE :search OR location_name LIKE :search)");
    params.search = `%${filters.search}%`;
  }
  if (filters.tag) {
    clauses.push("tags_json LIKE :tag");
    params.tag = `%${filters.tag}%`;
  }

  const query = `
    SELECT * FROM events
    WHERE ${clauses.join(" AND ")}
    ORDER BY start_time ASC
  `;
  return db.prepare(query).all(params);
}

function getEventById(id) {
  return db.prepare("SELECT * FROM events WHERE id = ?").get(id);
}

function listPendingEvents() {
  return db
    .prepare("SELECT * FROM events WHERE status = 'pending' ORDER BY created_at DESC")
    .all();
}

function updateEvent(id, updates) {
  const fields = [];
  const params = { id };
  Object.entries(updates).forEach(([key, value]) => {
    fields.push(`${key} = :${key}`);
    params[key] = value;
  });
  params.updated_at = nowIso();
  fields.push("updated_at = :updated_at");
  const stmt = db.prepare(`UPDATE events SET ${fields.join(", ")} WHERE id = :id`);
  stmt.run(params);
}

function insertEvent(event) {
  const stmt = db.prepare(`
    INSERT INTO events (
      title, category, source_type, organizer_name, location_name, address, lat, lng,
      start_time, end_time, cost_type, registration_url, age_range, tags_json, indoor,
      kid_friendly, status, created_at, updated_at
    ) VALUES (
      @title, @category, @source_type, @organizer_name, @location_name, @address, @lat, @lng,
      @start_time, @end_time, @cost_type, @registration_url, @age_range, @tags_json, @indoor,
      @kid_friendly, @status, @created_at, @updated_at
    )
  `);
  stmt.run({
    ...event,
    created_at: nowIso(),
    updated_at: nowIso()
  });
}

function insertVisitReport(report) {
  const stmt = db.prepare(`
    INSERT INTO visit_reports (
      event_id, attended, rating, actual_cost, crowd_level, kid_friendly, notes, created_at
    ) VALUES (
      @event_id, @attended, @rating, @actual_cost, @crowd_level, @kid_friendly, @notes, @created_at
    )
  `);
  stmt.run({
    ...report,
    created_at: nowIso()
  });
}

function getVisitSummary(eventId) {
  const summary = db
    .prepare(
      `SELECT COUNT(*) as count, AVG(rating) as avg_rating FROM visit_reports WHERE event_id = ? AND attended = 1`
    )
    .get(eventId);
  const latest = db
    .prepare(
      `SELECT notes, rating, crowd_level FROM visit_reports WHERE event_id = ? AND notes IS NOT NULL AND notes != '' ORDER BY created_at DESC LIMIT 3`
    )
    .all(eventId);
  return {
    count: summary.count,
    avg_rating: summary.avg_rating ? Number(summary.avg_rating.toFixed(1)) : null,
    highlights: latest
  };
}

function listPlaces(type) {
  return db
    .prepare("SELECT * FROM places WHERE type = ? ORDER BY created_at DESC")
    .all(type);
}

module.exports = {
  nowIso,
  normalizeTags,
  getWeekendRange,
  listEvents,
  getEventById,
  listPendingEvents,
  updateEvent,
  insertEvent,
  insertVisitReport,
  getVisitSummary,
  listPlaces
};
