import { Document } from "mongoose";

export type TDiscountType = "PERCENTAGE" | "FIXED";

export interface TPromoCode extends Document {
  code: string; // The actual code (e.g. "VIP2025")
  discountType: TDiscountType;
  discountAmount: number; // 10% or $10
  minOrderAmount: number; // e.g. Min purchase $50
  maxDiscountAmount?: number; // Optional: Max discount cap (e.g. Max $20 off)
  startDate: Date;
  endDate: Date;
  firstOrderOnly: boolean;
  usageLimit: number; // Total times this code can be used globally
  usedCount: number; // How many times it has been used so far
  applicableUsers: string[]; // Array of emails. Empty [] = Public for everyone.
  isActive: boolean;
}
