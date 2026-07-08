import { pgTable, text, smallint, timestamp, uuid } from "drizzle-orm/pg-core";

export const savedRoutines = pgTable("saved_routines", {
  id: uuid("id").defaultRandom().primaryKey(),
  user_id: text("user_id").notNull(),
  program_id: text("program_id").notNull(),
  program_name: text("program_name").notNull(),
  level: text("level"),
  color: text("color"),
  selected_weeks: smallint("selected_weeks").notNull(),
  notes: text("notes"),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const favoriteExercises = pgTable("favorite_exercises", {
  id: uuid("id").defaultRandom().primaryKey(),
  user_id: text("user_id").notNull(),
  exercise_id: text("exercise_id").notNull(),
  exercise_name: text("exercise_name").notNull(),
  body_part: text("body_part"),
  gif_url: text("gif_url"),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
