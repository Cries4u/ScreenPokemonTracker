import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").unique().notNull(),
  password: text("password").notNull(),
  currentStreak: integer("current_streak").default(0).notNull(),
  bestStreak: integer("best_streak").default(0).notNull(),
  dailyGoal: integer("daily_goal").default(120).notNull(),
});

export const screenTimeSessions = pgTable("screen_time_sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  minutes: integer("minutes").notNull(),
  date: timestamp("date").defaultNow().notNull(),
});

export const pokemonCards = pgTable("pokemon_cards", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  pokemonId: integer("pokemon_id").notNull(),
  name: text("name").notNull(),
  imageUrl: text("image_url").notNull(),
  rarity: text("rarity").notNull(),
  earned: timestamp("earned").defaultNow().notNull(),
});

export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  type: text("type").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  earned: timestamp("earned").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type ScreenTimeSession = typeof screenTimeSessions.$inferSelect;
export type PokemonCard = typeof pokemonCards.$inferSelect;
export type Achievement = typeof achievements.$inferSelect;
