import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface SalesData {
  name: string;
  value: number;
}

const monthlyData: SalesData[] = [
  { name: "JAN", value: 3800 },
  { name: "FEB", value: 400 },
  { name: "MAR", value: 1150 },
  { name: "APR", value: 300 },
  { name: "MAY", value: 1900 },
  { name: "JUN", value: 900 },
  { name: "JUL", value: 2000 },
];

const weeklyData: SalesData[] = [
  { name: "Week 1", value: 2500 },
  { name: "Week 2", value: 1800 },
  { name: "Week 3", value: 3200 },
  { name: "Week 4", value: 2100 },
];

const dailyData: SalesData[] = [
  { name: "Mon", value: 980 },
  { name: "Tue", value: 1240 },
  { name: "Wed", value: 1500 },
  { name: "Thu", value: 1300 },
  { name: "Fri", value: 1800 },
  { name: "Sat", value: 950 },
  { name: "Sun", value: 800 },
];

type TimeFrame = "daily" | "weekly" | "monthly";

interface SalesChartProps {
  className?: string;
}

const SalesChart: React.FC<SalesChartProps> = ({ className }) => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("monthly");
  const [activePoint, setActivePoint] = useState<SalesData | null>(null);

  const data = {
    monthly: monthlyData,
    weekly: weeklyData,
    daily: dailyData,
  };

  const currentData = data[timeFrame];

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-8">
        <CardTitle className="text-2xl font-bold">Sales Overview</CardTitle>
        <Select
          value={timeFrame}
          onValueChange={(value) => setTimeFrame(value as TimeFrame)}
        >
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="h-80 relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={currentData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            onMouseLeave={() => setActivePoint(null)}
          >
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={true}
              vertical={false}
              stroke="#e5e7eb"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              dy={10}
              tick={{ fill: "#6b7280", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
              tickFormatter={(value) =>
                `${value > 999 ? `${value / 1000}k` : value}`
              }
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  setActivePoint(data);
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#2563eb"
              strokeWidth={2}
              fill="url(#salesGradient)"
              activeDot={{
                r: 8,
                stroke: "#ffffff",
                strokeWidth: 2,
                fill: "#2563eb",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>

        {/* Tooltip bubble */}
        {activePoint && (
          <div
            className="absolute bg-black text-white px-3 py-2 rounded-md text-sm font-medium pointer-events-none transform -translate-x-1/2 -translate-y-full"
            style={{
              left: `${
                (currentData.findIndex((d) => d.name === activePoint.name) /
                  (currentData.length - 1)) *
                100
              }%`,
              top: `${100 - (activePoint.value / 4000) * 100}%`,
              marginTop: "-30px",
            }}
          >
            {activePoint.value.toLocaleString()}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SalesChart;
