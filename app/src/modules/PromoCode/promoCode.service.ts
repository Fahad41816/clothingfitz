 
// ⚠️ IMPORT YOUR ORDER MODEL HERE
// import Order from "../order/order.model";
// For this example, I will assume 'Order' is available.
// If you don't have it imported, replace 'Order.findOne' with your actual model.
import mongoose from "mongoose";
import { PromoCode } from "./promoCode.model";
import { TPromoCode } from "./promoCode.interface";
const Order = mongoose.model("Order"); // Temporary placeholder if you don't have the file path yet

// --- Admin: Create ---
const createPromoCodeIntoDB = async (payload: TPromoCode) => {
  const result = await PromoCode.create(payload);
  return result;
};

// --- Admin: Get All ---
const getAllPromoCodesFromDB = async () => {
  const result = await PromoCode.find().sort({ createdAt: -1 });
  return result;
};

// --- User: Apply Promo ---
const applyPromoCode = async (
  code: string,
  cartTotal: number,
  userId?: string,
  userEmail?: string
) => {
  // 1. Find the Promo
  const promo = await PromoCode.findOne({
    code: code.toUpperCase(),
    isActive: true,
  });

  if (!promo) {
    throw new Error("Invalid promo code");
  }

  // 2. "First Order Only" Check
  if (promo.firstOrderOnly) {
    if (!userId) {
      throw new Error("Please login to use this First Order promo code");
    }
    // Check if user has ANY previous order
    const previousOrder = await Order.findOne({ user: userId });
    if (previousOrder) {
      throw new Error("This code is valid only for your first order");
    }
  }

  // 3. "VIP / Specific User" Check
  if (promo.applicableUsers && promo.applicableUsers.length > 0) {
    if (!userEmail) {
      throw new Error("You must be logged in to use this private promo code");
    }
    if (!promo.applicableUsers.includes(userEmail.toLowerCase())) {
      throw new Error("This promo code is not valid for your account");
    }
  }

  // 4. Date Expiration Check
  const now = new Date();
  if (now < promo.startDate) throw new Error("Promo code is not active yet");
  if (now > promo.endDate) throw new Error("Promo code has expired");

  // 5. Usage Limit Check
  if (promo.usedCount >= promo.usageLimit)
    throw new Error("Promo code usage limit reached");

  // 6. Minimum Order Amount Check
  if (cartTotal < promo.minOrderAmount) {
    throw new Error(
      `Minimum order amount of $${promo.minOrderAmount} required`
    );
  }

  // 7. Calculate Discount
  let discountAmount = 0;

  if (promo.discountType === "FIXED") {
    discountAmount = promo.discountAmount;
  } else {
    // Percentage Logic
    discountAmount = (cartTotal * promo.discountAmount) / 100;
    // Cap logic (e.g. Max $50 off)
    if (promo.maxDiscountAmount && discountAmount > promo.maxDiscountAmount) {
      discountAmount = promo.maxDiscountAmount;
    }
  }

  // Safety: Discount can't exceed cart total
  if (discountAmount > cartTotal) {
    discountAmount = cartTotal;
  }

  return {
    isValid: true,
    code: promo.code,
    discountAmount: parseFloat(discountAmount.toFixed(2)),
    finalTotal: parseFloat((cartTotal - discountAmount).toFixed(2)),
    discountType: promo.discountType,
    promoId: promo._id,
  };
};

const updatePromoCodeInDB = async (
  id: string,
  payload: Partial<TPromoCode>
) => {
  // If the admin is adding/updating users, we must ensure they are lowercase
  if (payload.applicableUsers) {
    payload.applicableUsers = payload.applicableUsers.map((email) =>
      email.toLowerCase()
    );
  }

  const result = await PromoCode.findByIdAndUpdate(id, payload, {
    new: true, // Return the updated document
    runValidators: true, // Ensure rules (like required fields) are still checked
  });

  if (!result) {
    throw new Error("Promo code not found");
  }

  return result;
};

// --- Special Service: Add Users to Existing List (Append only) ---
// Use this if you don't want to replace the whole list, just add one person.
const addUserToPromoCode = async (id: string, email: string) => {
  const result = await PromoCode.findByIdAndUpdate(
    id,
    {
      // $addToSet only adds the email if it doesn't already exist (Prevents duplicates)
      $addToSet: { applicableUsers: email.toLowerCase() },
    },
    { new: true }
  );

  if (!result) {
    throw new Error("Promo code not found");
  }

  return result;
};

// Add them to your export
export const PromoServices = {
  createPromoCodeIntoDB,
  getAllPromoCodesFromDB,
  updatePromoCodeInDB, // <--- New
  addUserToPromoCode, // <--- New
  applyPromoCode,
};

export const PromoServices = {
  createPromoCodeIntoDB,
  getAllPromoCodesFromDB,
  applyPromoCode,
};
