import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface ProductionFormData {
  productA: number;
  productB: number;
  productC: number;
  workingHours: number;
  setupTime: number;
  timeHorizon: number;
  batchSize: number;
}

interface ProductionFormProps {
  onSubmit: (data: ProductionFormData) => void;
}

export const ProductionForm: React.FC<ProductionFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ProductionFormData>({
    defaultValues: {
      productA: 50,
      productB: 30,
      productC: 20,
      workingHours: 8,
      setupTime: 0.5,
      timeHorizon: 5,
      batchSize: 10
    }
  });

  const onSubmitForm = (data: ProductionFormData) => {
    toast.success("Production parameters updated");
    onSubmit(data);
  };

  return (
    <Card className="p-6 space-y-4 fade-in">
      <h2 className="text-2xl font-semibold mb-4">Production Parameters</h2>
      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Product A Daily Demand</label>
            <Input
              type="number"
              {...register("productA", { required: true, min: 0 })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Product B Daily Demand</label>
            <Input
              type="number"
              {...register("productB", { required: true, min: 0 })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Product C Daily Demand</label>
            <Input
              type="number"
              {...register("productC", { required: true, min: 0 })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Working Hours</label>
            <Input
              type="number"
              {...register("workingHours", { required: true, min: 1 })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Setup Time (hours)</label>
            <Input
              type="number"
              step="0.1"
              {...register("setupTime", { required: true, min: 0 })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Time Horizon (days)</label>
            <Input
              type="number"
              {...register("timeHorizon", { required: true, min: 1 })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Batch Size</label>
            <Input
              type="number"
              {...register("batchSize", { required: true, min: 1 })}
            />
          </div>
        </div>
        <Button type="submit" className="w-full">Calculate Production Schedule</Button>
      </form>
    </Card>
  );
};