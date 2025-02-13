import { stocks, watchlist, users, type Stock, type InsertStock, type User, type InsertUser, type Watchlist } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Stock operations
  getStock(id: number): Promise<Stock | undefined>;
  getStockBySymbol(symbol: string): Promise<Stock | undefined>;
  createStock(stock: InsertStock): Promise<Stock>;
  getAllStocks(): Promise<Stock[]>;

  // Watchlist operations
  getWatchlist(userId: number): Promise<{ watchlist: Watchlist; stock: Stock; }[]>;
  addToWatchlist(userId: number, stockId: number): Promise<Watchlist>;
  removeFromWatchlist(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }
  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }
  async createUser(insertUser: InsertUser): Promise<User> {
    const [newUser] = await db.insert(users).values(insertUser).returning();
    return newUser;
  }

  // Stock operations
  async getStock(id: number): Promise<Stock | undefined> {
    const [stock] = await db.select().from(stocks).where(eq(stocks.id, id));
    return stock;
  }

  async getStockBySymbol(symbol: string): Promise<Stock | undefined> {
    const [stock] = await db.select().from(stocks).where(eq(stocks.symbol, symbol));
    return stock;
  }

  async createStock(stock: InsertStock): Promise<Stock> {
    const [newStock] = await db.insert(stocks).values({
      ...stock,
      lastUpdated: new Date()
    }).returning();
    return newStock;
  }

  async getAllStocks(): Promise<Stock[]> {
    return await db.select().from(stocks);
  }

  // Watchlist operations
  async getWatchlist(userId: number): Promise<{ watchlist: Watchlist; stock: Stock; }[]> {
    const results = await db
      .select({
        watchlist: watchlist,
        stock: stocks
      })
      .from(watchlist)
      .innerJoin(stocks, eq(watchlist.stockId, stocks.id))
      .where(eq(watchlist.userId, userId));

    return results;
  }

  async addToWatchlist(userId: number, stockId: number): Promise<Watchlist> {
    const [item] = await db
      .insert(watchlist)
      .values({
        userId,
        stockId,
        addedAt: new Date()
      })
      .returning();
    return item;
  }

  async removeFromWatchlist(id: number): Promise<void> {
    await db.delete(watchlist).where(eq(watchlist.id, id));
  }
}

export const storage = new DatabaseStorage();