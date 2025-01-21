import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { db } from "@db";
import { screenTimeSessions, pokemonCards, achievements } from "@db/schema";
import { eq, and, gte, lte } from "drizzle-orm";

export function registerRoutes(app: Express): Server {
  setupAuth(app);

  // Screen time tracking
  app.post("/api/screen-time", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).send("Not logged in");
    }

    const { minutes } = req.body;
    if (typeof minutes !== "number" || minutes <= 0) {
      return res.status(400).send("Invalid minutes");
    }

    const session = await db.insert(screenTimeSessions)
      .values({
        userId: req.user!.id,
        minutes,
        date: new Date() // Explicitly set the date
      })
      .returning();

    res.json(session[0]);
  });

  // Get user's screen time for date range
  app.get("/api/screen-time", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).send("Not logged in");
    }

    const start = new Date(req.query.start as string);
    const end = new Date(req.query.end as string);

    // Validate dates
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).send("Invalid date range");
    }

    const sessions = await db.select()
      .from(screenTimeSessions)
      .where(
        and(
          eq(screenTimeSessions.userId, req.user!.id),
          gte(screenTimeSessions.date, start),
          lte(screenTimeSessions.date, end)
        )
      );

    res.json(sessions);
  });

  // Get user's Pokemon card collection
  app.get("/api/cards", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).send("Not logged in");
    }

    const cards = await db.select()
      .from(pokemonCards)
      .where(eq(pokemonCards.userId, req.user!.id));

    res.json(cards);
  });

  // Get user's achievements
  app.get("/api/achievements", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).send("Not logged in");
    }

    const badges = await db.select()
      .from(achievements)
      .where(eq(achievements.userId, req.user!.id));

    res.json(badges);
  });

  const httpServer = createServer(app);
  return httpServer;
}