import { db } from "$lib/db";
import { quizzes } from "$lib/db/schema";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const user = await db.select().from(quizzes);
  console.log(user);
};
