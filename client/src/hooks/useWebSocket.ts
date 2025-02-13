import { useState, useEffect, useCallback } from 'react';

interface MarketUpdate {
  symbol: string;
  price: string;
  change: string;
  volume: number;
}

export function useWebSocket() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [marketUpdates, setMarketUpdates] = useState<Map<string, MarketUpdate>>(new Map());

  useEffect(() => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      const update: MarketUpdate = JSON.parse(event.data);
      setMarketUpdates(prev => {
        const newMap = new Map(prev);
        newMap.set(update.symbol, update);
        return newMap;
      });
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const getStockUpdate = useCallback((symbol: string) => {
    return marketUpdates.get(symbol);
  }, [marketUpdates]);

  return {
    marketUpdates,
    getStockUpdate,
    isConnected: socket?.readyState === WebSocket.OPEN,
  };
}
