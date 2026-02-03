import mongoose, { Schema } from "mongoose";
import { TPromoCode } from "./promoCode.interface";

const PromoCodeSchema = new Schema<TPromoCode>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    discountType: {
      type: String,
      enum: ["PERCENTAGE", "FIXED"],
      required: true,
    },
    discountAmount: { type: Number, required: true, min: 0 },
    minOrderAmount: { type: Number, default: 0, min: 0 },
    maxDiscountAmount: { type: Number, min: 0 }, // Useful for percentage discounts
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    usageLimit: { type: Number, default: 100 },
    usedCount: { type: Number, default: 0 },
    firstOrderOnly: { type: Boolean, default: false },

    // The VIP List Logic
    applicableUsers: {
      type: [String],
      default: [],
      // Auto-convert to lowercase when saving
      set: (emails: string[]) => emails.map((e) => e.toLowerCase()),
    },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const PromoCode = mongoose.model<TPromoCode>(
  "PromoCode",
  PromoCodeSchema
);
