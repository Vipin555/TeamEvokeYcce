import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";

export function registerRoutes(app: Express): Server {
  const httpServer = createServer(app);

  // Create WebSocket server for real-time updates
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });
  const clients = new Set<WebSocket>();

  // Simulate market updates every 3 seconds
  setInterval(async () => {
    try {
      const stocks = await storage.getAllStocks();
      if (stocks.length === 0) {
        // Add some initial stock data if none exists
        await Promise.all([
          storage.createStock({
            symbol: "AAPL",
            name: "Apple Inc",
            currentPrice: "145.93",
            change: "23.41",
            volume: "5265",
            lastUpdated: new Date(),
          }),
          storage.createStock({
            symbol: "TSLA",
            name: "Tesla Inc",
            currentPrice: "177.90",
            change: "17.63",
            volume: "4125",
            lastUpdated: new Date(),
          }),
          storage.createStock({
            symbol: "NVDA",
            name: "Nvidia",
            currentPrice: "203.65",
            change: "5.63",
            volume: "3890",
            lastUpdated: new Date(),
          }),
        ]);
      }

      // Update stock prices with random changes
      stocks.forEach(async (stock) => {
        const currentPrice = parseFloat(stock.currentPrice.toString());
        const change = (Math.random() - 0.5) * 5; // Random change between -2.5 and 2.5
        const newPrice = currentPrice + change;
        const percentageChange = (change / currentPrice) * 100;
        const volume = Math.floor(Math.random() * 1000) + 4000;

        // Send updates to all connected clients
        const updateData = {
          symbol: stock.symbol,
          price: newPrice.toFixed(2),
          change: percentageChange.toFixed(2),
          volume: volume,
        };

        clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(updateData));
          }
        });
      });
    } catch (error) {
      console.error('Error updating stock prices:', error);
    }
  }, 3000);

  // Handle new WebSocket connections
  wss.on('connection', (ws) => {
    clients.add(ws);
    console.log('New client connected');

    ws.on('close', () => {
      clients.delete(ws);
      console.log('Client disconnected');
    });
  });

  return httpServer;
}