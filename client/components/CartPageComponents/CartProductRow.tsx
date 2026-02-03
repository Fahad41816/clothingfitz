/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Image from "next/image";
import { Minus, Plus, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";

export function CartItemRow({ item, onUpdateQuantity, onRemove }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Determine main display based on first variant
  const mainVariant = item.variants[0];
  const totalQuantity = item.variants.reduce(
    (acc: any, v: any) => acc + v.quantity,
    0
  );
  const totalPrice = item.variants.reduce(
    (acc: any, v: any) => acc + v.quantity * v.price,
    0
  );
  const distinctColors = Array.from(
    new Set(item.variants.map((v: any) => v.color))
  );

  const isMultipleColors = distinctColors.length > 1;

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-blue-100 transition-all">
      {/* Product Image */}
      <div className="relative w-24 h-24 md:w-32 md:h-32 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border">
        <Image
          src={
            mainVariant.image ||
            "/placeholder.svg?height=128&width=128&text=Product"
          }
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
            <p className="text-sm text-gray-500 capitalize">{item.type}</p>
          </div>
          <p className="font-bold text-lg text-[#3B82F6]">
            ${totalPrice.toFixed(2)}
          </p>
        </div>

        {/* Summary Chips */}
        <div className="flex flex-wrap gap-2">
          {distinctColors.map((color: any) => (
            <Badge
              key={color}
              variant="secondary"
              className="text-xs font-normal"
            >
              {color}
            </Badge>
          ))}
          {item.type === "clothing" && (
            <Badge variant="outline" className="text-xs font-normal">
              {item.variants.length} Size Variations
            </Badge>
          )}
        </div>

        {/* Primary Action / Display */}
        <div className="pt-2">
          {/* If it's a simple single hat, show direct controls */}
          {item.type === "hat" && !isMultipleColors ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">
                Quantity:
              </span>
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() =>
                    onUpdateQuantity(
                      item.id,
                      mainVariant.id,
                      Math.max(0, mainVariant.quantity - 1)
                    )
                  }
                >
                  <Minus className="w-3 h-3" />
                </Button>
                <span className="w-8 text-center text-sm">
                  {mainVariant.quantity}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() =>
                    onUpdateQuantity(
                      item.id,
                      mainVariant.id,
                      mainVariant.quantity + 1
                    )
                  }
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ) : (
            /* Complex Logic Button */
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="text-blue-600 border-blue-200 hover:bg-blue-50 bg-transparent"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  {item.type === "hat"
                    ? "Manage Colors & Quantities"
                    : "Manage Colors, Sizes & Quantities"}
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Edit Selections for {item.name}</DialogTitle>
                </DialogHeader>

                <div className="py-4 space-y-4 max-h-[60vh] overflow-y-auto">
                  {item.variants.map((variant: any) => (
                    <div
                      key={variant.id}
                      className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded border overflow-hidden relative">
                          <Image
                            src={variant.image || "/placeholder.svg"}
                            alt={variant.color}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{variant.color}</p>
                          {variant.size && (
                            <p className="text-xs text-gray-500">
                              Size: {variant.size}
                            </p>
                          )}
                          <p className="text-xs text-gray-500">
                            ${variant.price} each
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center border bg-white rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            onUpdateQuantity(
                              item.id,
                              variant.id,
                              Math.max(0, variant.quantity - 1)
                            )
                          }
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-10 text-center text-sm font-medium">
                          {variant.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            onUpdateQuantity(
                              item.id,
                              variant.id,
                              variant.quantity + 1
                            )
                          }
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <DialogFooter className="flex justify-between items-center w-full sm:justify-between">
                  <div className="text-sm text-gray-500">
                    Total Items: {totalQuantity}
                  </div>
                  <Button onClick={() => setIsModalOpen(false)}>Done</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      {/* Remove Button */}
      <Button
        variant="ghost"
        size="icon"
        className="text-red-400 hover:text-red-600 hover:bg-red-50 self-start md:self-center"
        onClick={() => onRemove(item.id)}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}
