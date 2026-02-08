const { db } = require("../lib/db");
const { nowIso } = require("../lib/data");

function nextWeekendDates() {
  const chicagoNow = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Chicago" })
  );
  const day = chicagoNow.getDay();
  const daysUntilSaturday = (6 - day + 7) % 7;
  const saturday = new Date(chicagoNow);
  saturday.setDate(chicagoNow.getDate() + daysUntilSaturday);
  saturday.setHours(10, 0, 0, 0);
  const sunday = new Date(saturday);
  sunday.setDate(saturday.getDate() + 1);
  sunday.setHours(10, 0, 0, 0);
  return { saturday, sunday };
}

function seedEvents() {
  db.prepare("DELETE FROM visit_reports").run();
  db.prepare("DELETE FROM events").run();

  const { saturday, sunday } = nextWeekendDates();
  const events = [
    {
      title: "Home Depot Kids Workshop",
      category: "手作",
      source_type: "merchant",
      organizer_name: "Home Depot",
      location_name: "Home Depot - Houston",
      address: "1234 Home Depot Dr, Houston, TX",
      start_time: new Date(saturday).toISOString(),
      end_time: new Date(saturday.getTime() + 2 * 60 * 60 * 1000).toISOString(),
      cost_type: "free",
      registration_url: "https://www.homedepot.com/c/kids-workshop",
      age_range: "5-12",
      tags_json: JSON.stringify(["手作", "親子"]),
      indoor: 1,
      kid_friendly: 1,
      status: "approved"
    },
    {
      title: "Lowe's DIY Kids Clinic",
      category: "手作",
      source_type: "merchant",
      organizer_name: "Lowe's",
      location_name: "Lowe's - Katy",
      address: "5678 Lowes Blvd, Katy, TX",
      start_time: new Date(saturday.getTime() + 3 * 60 * 60 * 1000).toISOString(),
      end_time: new Date(saturday.getTime() + 5 * 60 * 60 * 1000).toISOString(),
      cost_type: "free",
      registration_url: "https://www.lowes.com/events",
      age_range: "4-11",
      tags_json: JSON.stringify(["DIY", "親子"]),
      indoor: 1,
      kid_friendly: 1,
      status: "approved"
    },
    {
      title: "Taiwanese Community Picnic",
      category: "戶外",
      source_type: "community",
      organizer_name: "Houston Taiwanese Association",
      location_name: "Memorial Park",
      address: "6501 Memorial Dr, Houston, TX",
      start_time: new Date(saturday.getTime() + 5 * 60 * 60 * 1000).toISOString(),
      end_time: new Date(saturday.getTime() + 8 * 60 * 60 * 1000).toISOString(),
      cost_type: "free",
      registration_url: "https://example.com/picnic",
      age_range: "all ages",
      tags_json: JSON.stringify(["社群", "戶外"]),
      indoor: 0,
      kid_friendly: 1,
      status: "approved"
    },
    {
      title: "台灣親子故事時間",
      category: "文化",
      source_type: "community",
      organizer_name: "台灣文化中心",
      location_name: "Houston Public Library",
      address: "1001 McKinney St, Houston, TX",
      start_time: new Date(sunday).toISOString(),
      end_time: new Date(sunday.getTime() + 90 * 60 * 1000).toISOString(),
      cost_type: "free",
      registration_url: "https://example.com/storytime",
      age_range: "3-8",
      tags_json: JSON.stringify(["親子", "故事"]),
      indoor: 1,
      kid_friendly: 1,
      status: "approved"
    },
    {
      title: "Taiwanese Tea Workshop",
      category: "文化",
      source_type: "community",
      organizer_name: "Taiwan Tea Club",
      location_name: "Asia Society Texas",
      address: "1370 Southmore Blvd, Houston, TX",
      start_time: new Date(sunday.getTime() + 3 * 60 * 60 * 1000).toISOString(),
      end_time: new Date(sunday.getTime() + 5 * 60 * 60 * 1000).toISOString(),
      cost_type: "paid",
      registration_url: "https://example.com/tea",
      age_range: "12+",
      tags_json: JSON.stringify(["茶道", "文化"]),
      indoor: 1,
      kid_friendly: 0,
      status: "approved"
    },
    {
      title: "Taiwanese Cooking Demo",
      category: "美食",
      source_type: "community",
      organizer_name: "Taiwanese Culinary Group",
      location_name: "Community Center",
      address: "2345 Community Ln, Houston, TX",
      start_time: new Date(saturday.getTime() + 7 * 60 * 60 * 1000).toISOString(),
      end_time: new Date(saturday.getTime() + 9 * 60 * 60 * 1000).toISOString(),
      cost_type: "free",
      registration_url: "https://example.com/cooking",
      age_range: "all ages",
      tags_json: JSON.stringify(["美食", "示範"]),
      indoor: 1,
      kid_friendly: 1,
      status: "approved"
    },
    {
      title: "Mini Golf Family Day",
      category: "戶外",
      source_type: "merchant",
      organizer_name: "Adventure Mini Golf",
      location_name: "Adventure Mini Golf",
      address: "3456 Fun St, Houston, TX",
      start_time: new Date(sunday.getTime() + 6 * 60 * 60 * 1000).toISOString(),
      end_time: new Date(sunday.getTime() + 8 * 60 * 60 * 1000).toISOString(),
      cost_type: "paid",
      registration_url: "https://example.com/minigolf",
      age_range: "5+",
      tags_json: JSON.stringify(["戶外", "運動"]),
      indoor: 0,
      kid_friendly: 1,
      status: "approved"
    },
    {
      title: "Taiwanese Choir Rehearsal",
      category: "音樂",
      source_type: "community",
      organizer_name: "Taiwanese Choir",
      location_name: "Music Hall",
      address: "7890 Melody Rd, Houston, TX",
      start_time: new Date(saturday.getTime() + 8 * 60 * 60 * 1000).toISOString(),
      end_time: new Date(saturday.getTime() + 10 * 60 * 60 * 1000).toISOString(),
      cost_type: "free",
      registration_url: "https://example.com/choir",
      age_range: "12+",
      tags_json: JSON.stringify(["音樂", "合唱"]),
      indoor: 1,
      kid_friendly: 0,
      status: "approved"
    },
    {
      title: "Taiwanese Mahjong Night",
      category: "社交",
      source_type: "community",
      organizer_name: "Taiwanese Seniors Club",
      location_name: "Senior Center",
      address: "4567 Seniors Way, Houston, TX",
      start_time: new Date(sunday.getTime() + 7 * 60 * 60 * 1000).toISOString(),
      end_time: new Date(sunday.getTime() + 9 * 60 * 60 * 1000).toISOString(),
      cost_type: "donation",
      registration_url: "https://example.com/mahjong",
      age_range: "18+",
      tags_json: JSON.stringify(["桌遊", "社交"]),
      indoor: 1,
      kid_friendly: 0,
      status: "approved"
    },
    {
      title: "Taiwanese Art Market",
      category: "市集",
      source_type: "community",
      organizer_name: "Taiwan Art Collective",
      location_name: "Downtown Market",
      address: "5678 Market St, Houston, TX",
      start_time: new Date(sunday.getTime() + 9 * 60 * 60 * 1000).toISOString(),
      end_time: new Date(sunday.getTime() + 11 * 60 * 60 * 1000).toISOString(),
      cost_type: "free",
      registration_url: "https://example.com/artmarket",
      age_range: "all ages",
      tags_json: JSON.stringify(["市集", "藝術"]),
      indoor: 0,
      kid_friendly: 1,
      status: "approved"
    },
    {
      title: "Board Game Night",
      category: "社交",
      source_type: "merchant",
      organizer_name: "Local Game Store",
      location_name: "Meeple House",
      address: "6789 Game Ln, Houston, TX",
      start_time: new Date(saturday.getTime() + 9 * 60 * 60 * 1000).toISOString(),
      end_time: new Date(saturday.getTime() + 11 * 60 * 60 * 1000).toISOString(),
      cost_type: "paid",
      registration_url: "https://example.com/gamenight",
      age_range: "12+",
      tags_json: JSON.stringify(["桌遊", "社交"]),
      indoor: 1,
      kid_friendly: 0,
      status: "approved"
    },
    {
      title: "Taiwanese Newcomer Meetup",
      category: "社交",
      source_type: "community",
      organizer_name: "Taiwanese Student Association",
      location_name: "Campus Hall",
      address: "101 University Dr, Houston, TX",
      start_time: new Date(sunday.getTime() + 4 * 60 * 60 * 1000).toISOString(),
      end_time: new Date(sunday.getTime() + 6 * 60 * 60 * 1000).toISOString(),
      cost_type: "free",
      registration_url: "https://example.com/meetup",
      age_range: "18+",
      tags_json: JSON.stringify(["社交", "新朋友"]),
      indoor: 1,
      kid_friendly: 0,
      status: "approved"
    }
  ];

  const stmt = db.prepare(`
    INSERT INTO events (
      title, category, source_type, organizer_name, location_name, address, lat, lng,
      start_time, end_time, cost_type, registration_url, age_range, tags_json, indoor,
      kid_friendly, status, created_at, updated_at
    ) VALUES (
      @title, @category, @source_type, @organizer_name, @location_name, @address, NULL, NULL,
      @start_time, @end_time, @cost_type, @registration_url, @age_range, @tags_json, @indoor,
      @kid_friendly, @status, @created_at, @updated_at
    )
  `);

  events.forEach((event) => {
    stmt.run({
      ...event,
      created_at: nowIso(),
      updated_at: nowIso()
    });
  });
}

function seedPlaces() {
  db.prepare("DELETE FROM places").run();
  const stmt = db.prepare(`
    INSERT INTO places (type, subcategory, name, address, tags_json, notes, created_at)
    VALUES (@type, @subcategory, @name, @address, @tags_json, @notes, @created_at)
  `);

  const places = [
    {
      type: "food",
      subcategory: "台灣小吃",
      name: "Hou Mei Taiwanese",
      address: "999 Rice St, Houston, TX",
      tags_json: JSON.stringify(["牛肉麵", "鹽酥雞"]),
      notes: "人氣台灣小吃聚集。",
      created_at: nowIso()
    },
    {
      type: "food",
      subcategory: "甜點",
      name: "Boba Studio",
      address: "888 Tea Ave, Houston, TX",
      tags_json: JSON.stringify(["珍奶", "甜點"]),
      notes: "可客製甜度。",
      created_at: nowIso()
    },
    {
      type: "food",
      subcategory: "台灣早餐",
      name: "Morning TW",
      address: "777 Breakfast Ln, Houston, TX",
      tags_json: JSON.stringify(["蛋餅", "豆漿"]),
      notes: "週末早午餐人氣店。",
      created_at: nowIso()
    },
    {
      type: "directory",
      subcategory: "房地產",
      name: "台灣房仲服務",
      address: "555 Realty Rd, Houston, TX",
      tags_json: JSON.stringify(["置產", "租屋"]),
      notes: "提供中文服務。",
      created_at: nowIso()
    },
    {
      type: "directory",
      subcategory: "教育",
      name: "台灣中文學校",
      address: "444 School St, Houston, TX",
      tags_json: JSON.stringify(["週末班", "文化"]),
      notes: "適合幼兒至青少年。",
      created_at: nowIso()
    },
    {
      type: "directory",
      subcategory: "醫療",
      name: "台灣人診所",
      address: "333 Health Ave, Houston, TX",
      tags_json: JSON.stringify(["家庭醫學", "中文服務"]),
      notes: "預約制。",
      created_at: nowIso()
    }
  ];

  places.forEach((place) => stmt.run(place));
}

seedEvents();
seedPlaces();
console.log("Database seeded at", new Date().toISOString());
