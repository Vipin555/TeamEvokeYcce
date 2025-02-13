import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";

export function registerRoutes(app: Express): Server {
  const httpServer = createServer(app);
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });
  const clients = new Set<WebSocket>();

  // Keep track of current stock values
  const stockValues = new Map<string, {
    price: number;
    change: number;
    volume: number;
  }>();

  // Initialize stock data if needed
  async function initializeStocks() {
    try {
      const stocks = await storage.getAllStocks();
      if (stocks.length === 0) {
        const initialStocks = [
          {
            symbol: "AAPL",
            name: "Apple Inc",
            currentPrice: "145.93",
            change: "0.00",
            volume: "5265"
          },
          {
            symbol: "TSLA",
            name: "Tesla Inc",
            currentPrice: "177.90",
            change: "0.00",
            volume: "4125"
          },
          {
            symbol: "NVDA",
            name: "Nvidia",
            currentPrice: "203.65",
            change: "0.00",
            volume: "3890"
          }
        ];

        await Promise.all(
          initialStocks.map(stock => storage.createStock(stock))
        );

        // Initialize the stock values map
        initialStocks.forEach(stock => {
          stockValues.set(stock.symbol, {
            price: parseFloat(stock.currentPrice),
            change: 0,
            volume: parseInt(stock.volume)
          });
        });
      } else {
        // Load existing values into the map
        stocks.forEach(stock => {
          stockValues.set(stock.symbol, {
            price: parseFloat(stock.currentPrice.toString()),
            change: parseFloat(stock.change.toString()),
            volume: parseInt(stock.volume.toString())
          });
        });
      }
    } catch (error) {
      console.error('Error initializing stocks:', error);
    }
  }

  // Update and broadcast stock updates every 3 seconds
  setInterval(async () => {
    try {
      // Generate a single set of updates for all clients
      stockValues.forEach((value, symbol) => {
        const change = (Math.random() - 0.5) * 5;
        const newPrice = value.price + change;
        const percentageChange = (change / value.price) * 100;
        const newVolume = Math.floor(Math.random() * 1000) + 4000;

        // Update the stored values
        stockValues.set(symbol, {
          price: newPrice,
          change: percentageChange,
          volume: newVolume
        });

        // Broadcast the update to all clients
        const updateData = {
          symbol,
          price: newPrice.toFixed(2),
          change: percentageChange.toFixed(2),
          volume: newVolume
        };

        const message = JSON.stringify(updateData);
        clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(message);
          }
        });
      });
    } catch (error) {
      console.error('Error updating stock prices:', error);
    }
  }, 3000);

  // Initialize stocks when server starts
  initializeStocks().catch(console.error);

  // Handle WebSocket connections
  wss.on('connection', (ws) => {
    clients.add(ws);
    console.log('New client connected');

    // Send current values immediately upon connection
    stockValues.forEach((value, symbol) => {
      const currentData = {
        symbol,
        price: value.price.toFixed(2),
        change: value.change.toFixed(2),
        volume: value.volume
      };
      ws.send(JSON.stringify(currentData));
    });

    ws.on('close', () => {
      clients.delete(ws);
      console.log('Client disconnected');
    });
  });

  return httpServer;
}