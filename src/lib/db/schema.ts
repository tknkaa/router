import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const quizzes = sqliteTable("quiz", {
  id: int("id").primaryKey({ autoIncrement: true }),
  tehai: text("tehai", { mode: "json" }).$type<number[]>(),
  answers: text("answers", { mode: "json" }).$type<number[]>(),
});
