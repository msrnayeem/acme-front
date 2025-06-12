"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";

interface RevenueData {
  name: string;
  revenue: number;
  date: string;
}

const mockData: RevenueData[] = [
  { name: "JAN", revenue: 2400, date: "2025-01-01" },
  { name: "FEB", revenue: 1398, date: "2025-02-01" },
  { name: "MAR", revenue: 2200, date: "2025-03-01" },
  { name: "APR", revenue: 3908, date: "2025-04-01" },
  { name: "MAY", revenue: 4800, date: "2025-05-01" },
  { name: "JUN", revenue: 3800, date: "2025-06-01" },
  { name: "JUL", revenue: 4300, date: "2025-07-01" },
  { name: "AUG", revenue: 3490, date: "2025-08-01" },
  { name: "SEP", revenue: 2300, date: "2025-09-01" },
  { name: "OCT", revenue: 2800, date: "2025-10-01" },
  { name: "NOV", revenue: 3200, date: "2025-11-01" },
  { name: "DEC", revenue: 4100, date: "2025-12-01" },
];

// Fix for the CustomTooltip component
const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length > 0 && payload[0]) {
    return (
      <div className="bg-black text-white p-3 rounded-md shadow-md text-sm">
        <p className="text-xs font-medium text-gray-300 mb-1">{`${payload[0].payload.date} sales`}</p>
        <p className="font-semibold">
          ${payload[0].value?.toLocaleString() || "0"}
        </p>
      </div>
    );
  }
  return null;
};

type TimeFilterOption = "7 days" | "30 days" | "12 months";
const TimeFilterButton = ({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-1 text-xs font-medium rounded-md transition-colors",
        active
          ? "bg-gray-900 text-white"
          : "bg-white text-gray-600 hover:bg-gray-100"
      )}
    >
      {label}
    </button>
  );
};

export default function RevenueChart() {
  const [timeFilter, setTimeFilter] = useState<TimeFilterOption>("30 days");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  console.log(activeIndex);

  const handleTimeFilterChange = (option: TimeFilterOption) => {
    setTimeFilter(option);
  };

  // Using proper type for mouse events from recharts
  const handleMouseMove = (data: unknown) => {
    // Type guard to check and safely access activeTooltipIndex
    if (data && typeof data === "object" && "activeTooltipIndex" in data) {
      setActiveIndex(data.activeTooltipIndex as number);
    }
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      {/* Title and Filter Button */}
      <div className="flex justify-between items-center mb-2">
        {/* Title */}
        <div>
          <h2>Revenue Overview</h2>
          <p>Monthly revenue statistics for the current year</p>
        </div>
        {/* Filter Button */}
        <div className="flex space-x-2">
          <TimeFilterButton
            active={timeFilter === "7 days"}
            onClick={() => handleTimeFilterChange("7 days")}
            label="7 days"
          />
          <TimeFilterButton
            active={timeFilter === "30 days"}
            onClick={() => handleTimeFilterChange("30 days")}
            label="30 days"
          />
          <TimeFilterButton
            active={timeFilter === "12 months"}
            onClick={() => handleTimeFilterChange("12 months")}
            label="12 months"
          />
        </div>
      </div>
      {/* Graph  */}
      <div className="h-64 w-full mt-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={mockData}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#f0f0f0" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#888", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#888", fontSize: 12 }}
              tickFormatter={(value) => `${value}k`}
              domain={[0, 5000]}
              dx={-10}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#8b5cf6"
              strokeWidth={3}
              fill="url(#colorRevenue)"
              activeDot={{
                r: 6,
                fill: "#8b5cf6",
                strokeWidth: 2,
                stroke: "#fff",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
