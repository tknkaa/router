import { drizzle as bunSQLite } from "drizzle-orm/bun-sqlite";
import { drizzle as turso } from "drizzle-orm/libsql";
import { generateQuiz } from "$lib/hai/quiz";
import { quizzes } from "./schema";

async function seed() {
  const quiz = generateQuiz();
  if (quiz === null) {
    console.log("Failed to generate quiz");
    return;
  }
  const db =
    process.env.VERCEL === "0"
      ? bunSQLite(process.env.DATABASE_URL!)
      : turso({
          connection: {
            url: process.env.TURSO_DATABASE_URL!,
            authToken: process.env.TURSO_AUTH_TOKEN,
          },
        });
  const _result = await db.insert(quizzes).values({
    tehai: quiz.tehai,
    answers: quiz.answers,
  });
}

seed();
