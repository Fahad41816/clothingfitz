import express from "express";
import { ProductControllers } from "./product.controller";

const router = express.Router();

// --- Public Routes (Anyone can see) ---
router.get("/", ProductControllers.getAllProducts);
router.get("/:id", ProductControllers.getSingleProduct);

// --- Admin Routes (Protected) ---
// Note: Put specific routes like '/admin' BEFORE '/:id' or Express will think "admin" is an ID!
// router.get("/admin/all-products", ProductControllers.getAllProductsByAdmin);

router.post("/create-product", ProductControllers.createProduct);

router.patch("/:id", ProductControllers.updateProduct);

router.delete("/:id", ProductControllers.deleteProduct);

export const ProductRoutes = router;
