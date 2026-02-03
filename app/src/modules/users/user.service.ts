import { MUser } from "./user.model";
import { TUser } from "./users.interface";

interface TQueries {
  page?: string | number; // Frontend often sends this as string
  search?: string;
  role?: string;
}

const getUsersIntoDb = async (queries: TQueries) => {
  // 1. Default Defaults & Type Conversion
  // Ensure page is a number and defaults to 1 if missing
  const page = Number(queries.page) || 1;
  const { role, search } = queries;

  const limit = 20;
  const skip = (page - 1) * limit; // FIX: page 1 -> skip 0

  // 2. Build Query
  let query: any = {};

  if (search) {
    // Optional: Escape special regex chars to prevent crashes
    const safeSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const searchReg = new RegExp(safeSearch, "i");

    query.$or = [
      { firstName: searchReg },
      { lastName: searchReg },
      { email: searchReg },
    ];
  }

  if (role) {
    query.role = role;
  }

  // 3. Fetch Data
  const Users = await MUser.find(query)
    .limit(limit)
    .skip(skip)
    .sort({ createdAt: -1 });

  // 4. Calculate Pagination Metadata
  // totalDoc: Total users in the whole DB
  // totalDocByFilter: Total users matching the search/role
  const totalDoc = await MUser.countDocuments();
  const totalDocByFilter = await MUser.countDocuments(query);

  // Calculate total pages based on the filter
  const totalPages = Math.ceil(totalDocByFilter / limit);

  // FIX: Compare current page with Total Pages, not Total Docs
  const isNext = page < totalPages;
  const isPrev = page > 1;

  return {
    users: Users,
    meta: {
      totalDoc, // Total users in DB
      totalDocByFilter, // Total results for this specific search
      totalPages, // Total pages available
      currentPage: page,
      limit,
      isNext,
      isPrev,
    },
  };
};

const getSingleUserIntoDb = async (userId: string) => {
  const result = await MUser.findById(userId).select("-password");
  return result;
};

const updateUserByUserIntoDb = async (
  updateData: Partial<TUser>,
  userId: string
) => {
  const result = await MUser.findByIdAndUpdate(userId, updateData);

  return result;
};

const updateUserByAdminIntoDb = async (
  updateData: Partial<TUser>,
  UserId: string
) => {
  const result = await MUser.findByIdAndUpdate(UserId, updateData);

  return result;
};

export const userService = {
  getUsersIntoDb,
  getSingleUserIntoDb,
  updateUserByUserIntoDb,
  updateUserByAdminIntoDb,
};
