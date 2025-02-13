import { pgTable, text, serial, numeric, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

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
  addedAt: timestamp("added_at").notNull()
});

export const insertStockSchema = createInsertSchema(stocks).omit({ 
  id: true,
  lastUpdated: true 
});

export const insertWatchlistSchema = createInsertSchema(watchlist).omit({ 
  id: true 
});

export type InsertStock = z.infer<typeof insertStockSchema>;
export type Stock = typeof stocks.$inferSelect;
export type Watchlist = typeof watchlist.$inferSelect;
