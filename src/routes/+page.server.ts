import { getDB } from "$lib/db";
import { usersTable } from "$lib/db/schema";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const db = getDB();
  const user = await db.select().from(usersTable);
  console.log(user);
};
