import { drizzle as bunSQLite } from "drizzle-orm/bun-sqlite";
import { drizzle as turso } from "drizzle-orm/libsql";

const db =
	process.env.VERCEL === "1"
		? turso({
				connection: {
					url: process.env.TURSO_DATABASE_URL!,
					authToken: process.env.TURSO_AUTH_TOKEN!,
				},
			})
		: bunSQLite(process.env.DATABASE_URL!);

