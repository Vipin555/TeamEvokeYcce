import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { useWebSocket } from "@/hooks/useWebSocket";
import { useEffect, useState } from "react";

export default function StockMetrics() {
  const { marketUpdates } = useWebSocket();
  const [metrics, setMetrics] = useState({
    price: 18669,
    volume: 5265,
    change: -0.7
  });

  useEffect(() => {
    if (marketUpdates.size > 0) {
      // Calculate average metrics from all stocks
      let totalPrice = 0;
      let totalVolume = 0;
      let totalChange = 0;

      marketUpdates.forEach((update) => {
        totalPrice += parseFloat(update.price);
        totalVolume += update.volume;
        totalChange += parseFloat(update.change);
      });

      const avgPrice = totalPrice / marketUpdates.size;
      const avgVolume = totalVolume / marketUpdates.size;
      const avgChange = totalChange / marketUpdates.size;

      setMetrics({
        price: avgPrice,
        volume: avgVolume,
        change: avgChange
      });
    }
  }, [marketUpdates]);

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Real-Time Stock Details</h2>
        <span className="bg-primary text-white px-3 py-1 rounded-md text-sm">
          {currentTime}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Average Price</p>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold">
                  ${metrics.price.toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Average Volume</p>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold">
                  {Math.round(metrics.volume)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Average Change</p>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold">
                  {metrics.change.toFixed(2)}%
                </span>
                {metrics.change >= 0 ? (
                  <span className="text-green-500 flex items-center">
                    <ArrowUpIcon className="h-4 w-4" />
                  </span>
                ) : (
                  <span className="text-red-500 flex items-center">
                    <ArrowDownIcon className="h-4 w-4" />
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}