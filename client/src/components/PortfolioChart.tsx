import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { time: "10:00", value: 150000 },
  { time: "11:00", value: 154000 },
  { time: "12:00", value: 157000 },
  { time: "13:00", value: 156000 },
  { time: "14:00", value: 158000 },
  { time: "15:00", value: 160000 }
];

const timeRanges = ["1D", "5D", "1M", "6M", "1Y", "5Y", "Max"];

export default function PortfolioChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Analytics</CardTitle>
        <div className="flex gap-2">
          {timeRanges.map((range) => (
            <button
              key={range}
              className="px-3 py-1 text-sm rounded-md hover:bg-gray-100"
            >
              {range}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(222, 47%, 11%)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
