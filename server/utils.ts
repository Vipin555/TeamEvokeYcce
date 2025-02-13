import { db } from "./db";
import { stocks } from "@shared/schema";
import { eq } from "drizzle-orm";

export async function updateStockPrices() {
  // Get all stocks
  const allStocks = await db.select().from(stocks);
  
  for (const stock of allStocks) {
    // Generate random price movement (-5% to +5%)
    const priceChange = stock.currentPrice * (Math.random() * 0.1 - 0.05);
    const newPrice = Number((stock.currentPrice + priceChange).toFixed(2));
    
    // Generate random volume change (±30%)
    const volumeChange = Math.floor(stock.volume * (Math.random() * 0.6 - 0.3));
    const newVolume = Math.max(0, stock.volume + volumeChange);
    
    // Update the stock
    await db
      .update(stocks)
      .set({
        currentPrice: newPrice,
        change: Number(priceChange.toFixed(2)),
        volume: newVolume,
        lastUpdated: new Date(),
        updatedAt: new Date()
      })
      .where(eq(stocks.id, stock.id));
  }
}

// Function to start periodic updates
export function startStockUpdates(intervalMs: number = 5000) {
  return setInterval(updateStockPrices, intervalMs);
}
