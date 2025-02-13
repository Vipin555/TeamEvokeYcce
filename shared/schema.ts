import { pgTable, text, serial, numeric, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow()
});

export const stocks = pgTable("stocks", {
  id: serial("id").primaryKey(),
  symbol: text("symbol").notNull().unique(),
  name: text("name").notNull(),
  currentPrice: numeric("current_price").notNull(),
  change: numeric("change").notNull(),
  volume: numeric("volume").notNull(),
  lastUpdated: timestamp("last_updated").notNull()
});

export const watchlist = pgTable("watchlist", {
  id: serial("id").primaryKey(),
  stockId: serial("stock_id").references(() => stocks.id),
  userId: serial("user_id").references(() => users.id),
  addedAt: timestamp("added_at").notNull().defaultNow()
});

// Generate schemas
export const insertUserSchema = createInsertSchema(users).omit({ 
  id: true,
  createdAt: true 
});

export const insertStockSchema = createInsertSchema(stocks).omit({ 
  id: true,
  lastUpdated: true 
});

export const insertWatchlistSchema = createInsertSchema(watchlist).omit({ 
  id: true,
  addedAt: true
});

// Export types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Stock = typeof stocks.$inferSelect;
export type InsertStock = z.infer<typeof insertStockSchema>;

export type Watchlist = typeof watchlist.$inferSelect;
export type InsertWatchlist = z.infer<typeof insertWatchlistSchema>;