import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  HiOutlineBuildingOffice2,
  HiOutlineGlobeAlt,
  HiOutlineCube,
  HiOutlineComputerDesktop,
  HiOutlineTruck,
  HiOutlineCreditCard
} from "react-icons/hi2";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";

const watchlistItems = [
  { name: "Amazon.com Inc", symbol: "AMZN", price: 102.24, change: 2.55, icon: HiOutlineGlobeAlt },
  { name: "Coca-Cola Co", symbol: "KO", price: 60.49, change: -0.26, icon: HiOutlineBuildingOffice2 },
  { name: "BMW", symbol: "BMW", price: 99.94, change: -0.59, icon: HiOutlineCube },
  { name: "Microsoft Corp", symbol: "MSFT", price: 248.16, change: 1.47, icon: HiOutlineComputerDesktop },
  { name: "United Parcel Service Inc", symbol: "UPS", price: 182.06, change: -2.37, icon: HiOutlineTruck },
  { name: "Mastercard Inc", symbol: "MA", price: 374.03, change: 5.21, icon: HiOutlineCreditCard }
];

export default function Watchlist() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Watchlist</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {watchlistItems.map((item) => {
            const Icon = item.icon;
            const isPositive = item.change >= 0;

            return (
              <div key={item.symbol} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon className="h-6 w-6" />
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">${item.price}</p>
                  <p className={`text-xs flex items-center justify-end ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {isPositive ? <ArrowUpIcon className="h-3 w-3 mr-1" /> : <ArrowDownIcon className="h-3 w-3 mr-1" />}
                    {Math.abs(item.change)}%
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
