import { db } from "./sqlite"

export const runMigrations = () => {
  db.execSync(`CREATE TABLE IF NOT EXISTS guest_profile (
          guest_id TEXT primary key,
          display_name TEXT NOT null,
          created_at INTEGER NOT null
        )`)
}
