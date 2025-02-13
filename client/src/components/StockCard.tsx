import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";

interface StockCardProps {
  symbol: string;
  name: string;
  price: number;
  change: number;
}

export default function StockCard({ symbol, name, price, change }: StockCardProps) {
  const isPositive = change >= 0;

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">{symbol}</h3>
            <p className="text-sm text-gray-500">{name}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold">${price.toFixed(2)}</p>
            <p className={`text-sm flex items-center justify-end ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {isPositive ? <ArrowUpIcon className="h-4 w-4 mr-1" /> : <ArrowDownIcon className="h-4 w-4 mr-1" />}
              {change.toFixed(2)}
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
