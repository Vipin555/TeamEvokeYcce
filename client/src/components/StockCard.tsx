import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { useWebSocket } from "@/hooks/useWebSocket";
import { useEffect, useState } from "react";

interface StockCardProps {
  symbol: string;
  name: string;
  initialPrice: number;
  initialChange: number;
}

export default function StockCard({ symbol, name, initialPrice, initialChange }: StockCardProps) {
  const { getStockUpdate } = useWebSocket();
  const [price, setPrice] = useState(initialPrice);
  const [change, setChange] = useState(initialChange);

  useEffect(() => {
    const update = getStockUpdate(symbol);
    if (update) {
      setPrice(parseFloat(update.price));
      setChange(parseFloat(update.change));
    }
  }, [getStockUpdate, symbol]);

  const isPositive = change >= 0;

  return (
    <Card className={`transition-all duration-300 ${
      isPositive ? 'bg-green-50' : 'bg-red-50'
    }`}>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">{symbol}</h3>
            <p className="text-sm text-gray-500">{name}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold">${price.toFixed(2)}</p>
            <p className={`text-sm flex items-center justify-end ${
              isPositive ? 'text-green-500' : 'text-red-500'
            }`}>
              {isPositive ? 
                <ArrowUpIcon className="h-4 w-4 mr-1" /> : 
                <ArrowDownIcon className="h-4 w-4 mr-1" />
              }
              {Math.abs(change).toFixed(2)}
            </p>
          </div>
        </div>
        <div className="w-full h-12 bg-gray-100 rounded-lg">
          {/* Placeholder for mini chart */}
        </div>
      </CardContent>
    </Card>
  );
}