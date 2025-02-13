import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";

export default function StockMetrics() {
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
              <p className="text-sm text-gray-500">Price</p>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold">18669</span>
                <span className="text-green-500 flex items-center">
                  <ArrowUpIcon className="h-4 w-4" />
                  1.2%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Volume</p>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold">5265</span>
                <span className="text-red-500 flex items-center">
                  <ArrowDownIcon className="h-4 w-4" />
                  0.5%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Change</p>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold">18669</span>
                <span className="text-red-500 flex items-center">
                  <ArrowDownIcon className="h-4 w-4" />
                  0.7%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
