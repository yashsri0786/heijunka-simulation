import React, { useState } from "react";
import { ProductionForm } from "@/components/ProductionForm";
import { ProductionChart } from "@/components/ProductionChart";
import { EfficiencyMetrics } from "@/components/EfficiencyMetrics";

interface ProductionData {
  day: number;
  productA: number;
  productB: number;
  productC: number;
}

const calculateProduction = (formData: any): {
  schedule: ProductionData[];
  metrics: {
    utilization: number;
    setupTime: number;
    idleTime: number;
  };
} => {
  const schedule: ProductionData[] = [];
  const totalDemand = formData.productA + formData.productB + formData.productC;
  const setupTimeTotal = formData.setupTime * 3; // Setup time for all products
  const availableProductionTime = formData.workingHours - setupTimeTotal;
  const utilizationRate = Math.min((totalDemand / formData.batchSize) * formData.setupTime / formData.workingHours * 100, 100);

  for (let day = 1; day <= formData.timeHorizon; day++) {
    schedule.push({
      day,
      productA: Math.round(formData.productA / formData.timeHorizon),
      productB: Math.round(formData.productB / formData.timeHorizon),
      productC: Math.round(formData.productC / formData.timeHorizon),
    });
  }

  return {
    schedule,
    metrics: {
      utilization: utilizationRate,
      setupTime: setupTimeTotal * formData.timeHorizon,
      idleTime: Math.max(0, (formData.workingHours - availableProductionTime) * formData.timeHorizon),
    },
  };
};

const Index = () => {
  const [productionData, setProductionData] = useState<{
    schedule: ProductionData[];
    metrics: {
      utilization: number;
      setupTime: number;
      idleTime: number;
    };
  } | null>(null);

  const handleFormSubmit = (formData: any) => {
    const result = calculateProduction(formData);
    setProductionData(result);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Production Leveling Simulator</h1>
        <p className="text-muted-foreground">
          Optimize your production schedule with our Heijunka simulator
        </p>
      </div>

      <ProductionForm onSubmit={handleFormSubmit} />

      {productionData && (
        <>
          <ProductionChart data={productionData.schedule} />
          <EfficiencyMetrics {...productionData.metrics} />
        </>
      )}
    </div>
  );
};

export default Index;