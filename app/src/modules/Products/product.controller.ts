import { Request, Response } from "express";
import CatchAsync from "../../utils/CatchAsync";
import { ProductServices } from "./product.service";

// 1. Create Product
const createProduct = CatchAsync(async (req: Request, res: Response) => {
  const result = await ProductServices.createProductIntoDB(req.body);

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: result,
  });
});

// 2. Get All Products (Public View - Active Only)
const getAllProducts = CatchAsync(async (req: Request, res: Response) => {
  const result = await ProductServices.getAllProductsFromDB(req.query);

  res.status(200).json({
    success: true,
    message: "Products retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

// 4. Get Single Product
const getSingleProduct = CatchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProductServices.getSingleProductFromDB(id);

  // Handle case where product is not found (Optional, if service doesn't throw)
  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Product retrieved successfully",
    data: result,
  });
});

// 5. Update Product
const updateProduct = CatchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProductServices.updateProductInDB(id, req.body);

  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Product not found to update",
    });
  }

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: result,
  });
});

// 6. Delete Product (Soft Delete)
const deleteProduct = CatchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProductServices.deleteProductFromDB(id);

  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Product not found to delete",
    });
  }

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
    data: result,
  });
});

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
