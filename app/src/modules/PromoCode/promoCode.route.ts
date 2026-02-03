import express from "express";
import { PromoController } from "./promoCode.controller";

const router = express.Router();

// --- Admin Routes ---
router.post(
  "/create-promo",
  //   auth(USER_ROLE.ADMIN),
  PromoController.createPromoCode
);

router.get(
  "/",
  //   auth(USER_ROLE.ADMIN),
  PromoController.getAllPromoCodes
);

// --- User Routes ---
// Use 'auth' so we can get the userId for "First Order" checks
router.post(
  "/apply",
  //   auth(USER_ROLE.USER),
  PromoController.applyPromoCode
);

router.patch(
  "/:id",
  //  auth(USER_ROLE.ADMIN),
  PromoController.updatePromoCode
);

// 2. Specific Route: Just add ONE user to the list
// URL Example: /api/v1/promos/add-user/65a123...
router.patch(
  "/add-user/:id",
  //   auth(USER_ROLE.ADMIN),
  PromoController.addAllowedUser
);

export const PromoRoutes = router;
