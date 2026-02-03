import mongoose, { Schema, Model } from "mongoose";
// Adjust the import path to where your interface file is located
import { TProduct, TPackage, TColor, TSizeCharge } from "./product.interface";

// --- 1. Sub-Schemas (for nested arrays) ---

const PackageSchema = new Schema<TPackage>(
  {
    title: { type: String, required: true },
    qty: { type: Number, required: true, min: 0 },
    ispopular: { type: Boolean, default: false },
  },
  { _id: false }
); // _id: false because these usually don't need their own unique ID

const ColorSchema = new Schema<TColor>(
  {
    name: { type: String, required: true },
    images: [{ type: String }], // Array of image URLs specific to this color
    hex: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { _id: false }
);

const SizeChargeSchema = new Schema<TSizeCharge>(
  {
    size: { type: String, required: true },
    charge: { type: Number, required: true, min: 0 }, // Extra cost for this size
  },
  { _id: false }
);

// --- 2. Main Product Schema ---

const ProductSchema = new Schema<TProduct>(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },
    discount_price: {
      type: Number,
      default: 0,
      required: [true, "discount price is required"],
      min: 0,
    },
    // Embedding the Sub-Schemas defined above
    package: [PackageSchema],
    colors: [ColorSchema],
    sizeCharge: [SizeChargeSchema],

    primaryImages: [{ type: String }], // Array of strings as per your interface

    description: {
      type: String,
      required: [true, "Description is required"],
    },
    category: {
      type: String,
      enum: ["T-Shirt", "Hats", "Hoodie", "Sweatshirt", "Polo"],
      required: [true, "Category is required"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// --- 3. Create & Export Model ---

const MProduct = mongoose.model<TProduct>("Product", ProductSchema);
export default MProduct;
