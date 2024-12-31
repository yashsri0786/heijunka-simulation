import React from "react";
import { Card } from "@/components/ui/card";

interface EfficiencyMetricsProps {
  utilization: number;
  setupTime: number;
  idleTime: number;
}

export const EfficiencyMetrics: React.FC<EfficiencyMetricsProps> = ({
  utilization,
  setupTime,
  idleTime,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 fade-in">
      <Card className="p-6 card-hover">
        <h3 className="text-sm font-medium text-muted-foreground">Utilization</h3>
        <p className="text-2xl font-bold mt-2">{utilization.toFixed(1)}%</p>
      </Card>
      <Card className="p-6 card-hover">
        <h3 className="text-sm font-medium text-muted-foreground">Setup Time</h3>
        <p className="text-2xl font-bold mt-2">{setupTime.toFixed(1)} hours</p>
      </Card>
      <Card className="p-6 card-hover">
        <h3 className="text-sm font-medium text-muted-foreground">Idle Time</h3>
        <p className="text-2xl font-bold mt-2">{idleTime.toFixed(1)} hours</p>
      </Card>
    </div>
  );
};