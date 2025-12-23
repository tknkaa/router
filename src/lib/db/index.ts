import { drizzle as bunSQLite } from "drizzle-orm/bun-sqlite";
import { drizzle as turso } from "drizzle-orm/libsql";
import {
  DATABASE_URL,
  TURSO_AUTH_TOKEN,
  TURSO_DATABASE_URL,
  VERCEL,
} from "$env/static/private";

export function getDB() {
  const db =
    VERCEL === "1"
      ? turso({
          connection: {
            url: TURSO_DATABASE_URL,
            authToken: TURSO_AUTH_TOKEN,
          },
        })
      : bunSQLite(DATABASE_URL);

  return db;
}
