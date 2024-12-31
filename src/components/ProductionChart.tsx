import React from "react";
import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ProductionData {
  day: number;
  productA: number;
  productB: number;
  productC: number;
}

interface ProductionChartProps {
  data: ProductionData[];
}

export const ProductionChart: React.FC<ProductionChartProps> = ({ data }) => {
  return (
    <Card className="p-6 fade-in">
      <h2 className="text-2xl font-semibold mb-4">Production Schedule</h2>
      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="productA" name="Product A" fill="#8884d8" />
            <Bar dataKey="productB" name="Product B" fill="#82ca9d" />
            <Bar dataKey="productC" name="Product C" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};