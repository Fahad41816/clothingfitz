/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { motion } from "framer-motion";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";

const HatsStepTwo = ({
  SelectedColors,
  quantities,
  setQuantities,
  minQty,
}: any) => {
  const handleQuantityChange = (colorData: any, value: number) => {
    console.log(colorData, value);
    const newQuantities = { ...quantities };
    console.log(newQuantities);
    if (value <= 0) {
      delete newQuantities[colorData.name];
    } else {
      newQuantities[colorData.name] = value;
    }
    setQuantities(newQuantities);
  };

  const totalQuantity: any = Object.values(quantities).reduce(
    (sum: any, q: any) => sum + q,
    0
  );

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-600">
        Set the quantity for each color. Your total must match or exceed your
        selected package.
      </p>

      <div className="space-y-4">
        {SelectedColors.map((color: any) => {
          return (
            <motion.div
              key={color.hex}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="border border-slate-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className="h-12 w-12 rounded-lg border-2 border-slate-200"
                      style={{ backgroundColor: color?.hex }}
                    />
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        {color?.name}
                      </h4>
                      <p className="text-sm text-slate-600">Quantity: {0}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        handleQuantityChange(
                          color,
                          quantities[color.name] - 1 || 0
                        )
                      }
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <input
                      type="number"
                      value={quantities[color.name] || 0}
                      onChange={(e) =>
                        handleQuantityChange(
                          color,
                          Math.max(0, Number.parseInt(e.target.value))
                        )
                      }
                      className="h-10 w-16 border border-slate-300 bg-white px-2 text-center font-semibold text-slate-900"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        handleQuantityChange(
                          color,
                          quantities[color.name] + 1 || 1
                        )
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-lg bg-red-50 p-4 ${
          totalQuantity >= minQty
            ? "bg-gradient-to-r from-emerald-500/20 via-primary/20 to-blue-500/20 border-2 border-primary shadow-xl"
            : "bg-gradient-to-r from-red-500/20 via-destructive/20 to-orange-500/20 border-2 border-destructive shadow-xl"
        }`}
      >
        <p className="font-semibold text-slate-900">
          Total Quantity:{" "}
          <span className="text-2xl text-green-600">{totalQuantity || 0}</span>
        </p>
        <p className="mt-1 text-sm text-slate-600">
          Package minimum: {minQty} pieces
        </p>
      </motion.div>
    </div>
  );
};

export default HatsStepTwo;
