// server/db.ts — Database connection using Drizzle ORM + Neon serverless
import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonDatabase } from "drizzle-orm/neon-serverless";
import * as schema from "@shared/schema";

let _db: NeonDatabase<typeof schema> | null = null;

export function getDb(): NeonDatabase<typeof schema> {
  if (!_db) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error("DATABASE_URL is not set");
    }
    // neon() returns a query function; drizzle wraps it
    const sql = neon(connectionString);
    _db = drizzle(sql as any, { schema });
  }
  return _db;
}

export type Db = NeonDatabase<typeof schema>;
