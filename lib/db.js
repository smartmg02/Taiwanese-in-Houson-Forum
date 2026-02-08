const fs = require("fs");
const path = require("path");
const Database = require("better-sqlite3");

const DB_PATH = "/data/app.db";

function ensureDatabase() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.exec(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category TEXT,
      source_type TEXT,
      organizer_name TEXT,
      location_name TEXT,
      address TEXT,
      lat REAL,
      lng REAL,
      start_time TEXT,
      end_time TEXT,
      cost_type TEXT,
      registration_url TEXT,
      age_range TEXT,
      tags_json TEXT,
      indoor INTEGER,
      kid_friendly INTEGER,
      status TEXT DEFAULT 'pending',
      created_at TEXT,
      updated_at TEXT
    );

    CREATE TABLE IF NOT EXISTS visit_reports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_id INTEGER NOT NULL,
      attended INTEGER,
      rating INTEGER,
      actual_cost REAL,
      crowd_level TEXT,
      kid_friendly INTEGER,
      notes TEXT,
      created_at TEXT,
      FOREIGN KEY(event_id) REFERENCES events(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT,
      subcategory TEXT,
      name TEXT,
      address TEXT,
      tags_json TEXT,
      notes TEXT,
      created_at TEXT
    );
  `);
  return db;
}

const db = ensureDatabase();

module.exports = {
  db,
  DB_PATH
};
