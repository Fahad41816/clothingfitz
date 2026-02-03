import { TProduct } from "./product.interface";
import MProduct from "./product.model";

// --- 1. Create Product ---
const createProductIntoDB = async (payload: TProduct) => {
  const result = await MProduct.create(payload);
  return result;
};

// --- 2. Get All Products (With Search, Filter & Pagination) ---
const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const {
    page = 1,
    limit = 20,
    searchTerm,
    category,
    sort,
    minPrice,
    maxPrice,
  } = query;

  // A. Pagination Logic
  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const skip = (pageNumber - 1) * limitNumber;

  // B. Build the Query Object
  const filterConditions: any = {};

  // 1. Search (Title or Description)
  if (searchTerm) {
    const searchRegex = new RegExp(searchTerm as string, "i");
    filterConditions.$or = [
      { title: searchRegex },
      { description: searchRegex },
    ];
  }

  // 2. Filter by Category
  if (category) {
    filterConditions.category = category;
  }

  // 3. Filter by Price Range
  if (minPrice || maxPrice) {
    filterConditions.price = {};
    if (minPrice) filterConditions.price.$gte = Number(minPrice);
    if (maxPrice) filterConditions.price.$lte = Number(maxPrice);
  }

  // 4. Filter by Active Status (Optional: only show active products)
  filterConditions.isActive = true;

  // C. Sorting Logic (Default: Newest first)
  const sortOptions: any = {};
  if (sort) {
    const [field, order] = (sort as string).split(":"); // e.g., "price:desc"
    sortOptions[field] = order === "desc" ? -1 : 1;
  } else {
    sortOptions.createdAt = -1;
  }

  // D. Execute Query
  const result = await MProduct.find(filterConditions)
    .sort(sortOptions)
    .skip(skip)
    .limit(limitNumber);

  // E. Calculate Metadata
  const totalDoc = await MProduct.countDocuments(filterConditions);
  const totalPages = Math.ceil(totalDoc / limitNumber);

  return {
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total: totalDoc,
      totalPage: totalPages,
    },
    data: result,
  };
};

// --- 3. Get Single Product ---
const getSingleProductFromDB = async (id: string) => {
  const result = await MProduct.findById(id);
  // Optional: Throw error here if not found, or handle in controller
  return result;
};

// --- 4. Update Product ---
const updateProductInDB = async (id: string, payload: Partial<TProduct>) => {
  const result = await MProduct.findByIdAndUpdate(id, payload, {
    new: true, // Returns the updated document instead of the old one
    runValidators: true, // Ensures updates follow your schema rules
  });
  return result;
};

// --- 5. Delete Product (Soft Delete recommended) ---
const deleteProductFromDB = async (id: string) => {
  // We usually don't physically delete, just set isActive: false
  const result = await MProduct.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductInDB,
  deleteProductFromDB,
};
