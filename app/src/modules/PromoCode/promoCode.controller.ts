import { Request, Response } from "express";
import CatchAsync from "../../utils/CatchAsync";
import { PromoServices } from "./promoCode.service";

// Admin: Create
const createPromoCode = CatchAsync(async (req, res) => {
  const result = await PromoServices.createPromoCodeIntoDB(req.body);

  res.status(201).json({
    success: true,
    message: "Promo code created successfully",
    data: result,
  });
});

// Admin: Get All
const getAllPromoCodes = CatchAsync(async (req, res) => {
  const result = await PromoServices.getAllPromoCodesFromDB();

  res.status(200).json({
    success: true,
    message: "All promo codes retrieved",
    data: result,
  });
});

// User: Apply
const applyPromoCode = CatchAsync(async (req, res) => {
  const { code, cartTotal } = req.body;

  // We extract User Info from the token (Auth Middleware)
  // Check your middleware definition: usually req.user or req.user.userId
  const userId = req.user?._id || req.user?.userId;
  const userEmail = req.user?.email;

  if (!code || !cartTotal) {
    return res
      .status(400)
      .json({ success: false, message: "Code and Cart Total required" });
  }

  try {
    const result = await PromoServices.applyPromoCode(
      code,
      Number(cartTotal),
      userId,
      userEmail
    );

    res.status(200).json({
      success: true,
      message: "Promo code applied successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

const updatePromoCode = CatchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await PromoServices.updatePromoCodeInDB(id, req.body);

  res.status(200).json({
    success: true,
    message: "Promo code updated successfully",
    data: result,
  });
});

// --- Admin: Add Single User to Promo (API Endpoint) ---
const addAllowedUser = CatchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email } = req.body; // Expecting { "email": "newuser@example.com" }

  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });
  }

  const result = await PromoServices.addUserToPromoCode(id, email);

  res.status(200).json({
    success: true,
    message: "User added to promo code successfully",
    data: result,
  });
});

export const PromoController = {
  createPromoCode,
  getAllPromoCodes,
  applyPromoCode,
  updatePromoCode, // <--- New
  addAllowedUser, // <--- New
};
