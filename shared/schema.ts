import { pgTable, serial, varchar, timestamp, text, decimal, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 255 }).notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

// Stocks table
export const stocks = pgTable('stocks', {
  id: serial('id').primaryKey(),
  symbol: varchar('symbol', { length: 10 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  currentPrice: decimal('current_price', { precision: 10, scale: 2 }).notNull(),
  change: decimal('change', { precision: 10, scale: 2 }).notNull(),
  volume: integer('volume').notNull(),
  lastUpdated: timestamp('last_updated').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

// Watchlist table
export const watchlist = pgTable('watchlist', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  stockId: integer('stock_id').notNull().references(() => stocks.id),
  addedAt: timestamp('added_at').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  watchlist: many(watchlist)
}));

export const stocksRelations = relations(stocks, ({ many }) => ({
  watchlist: many(watchlist)
}));

export const watchlistRelations = relations(watchlist, ({ one }) => ({
  user: one(users, {
    fields: [watchlist.userId],
    references: [users.id]
  }),
  stock: one(stocks, {
    fields: [watchlist.stockId],
    references: [stocks.id]
  })
}));

// Zod Schemas for insertions
export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true, updatedAt: true });
export const insertStockSchema = createInsertSchema(stocks).omit({ id: true, createdAt: true, updatedAt: true });
export const insertWatchlistSchema = createInsertSchema(watchlist).omit({ id: true, createdAt: true, updatedAt: true });

// TypeScript types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Stock = typeof stocks.$inferSelect;
export type InsertStock = z.infer<typeof insertStockSchema>;
export type Watchlist = typeof watchlist.$inferSelect;
export type InsertWatchlist = z.infer<typeof insertWatchlistSchema>;