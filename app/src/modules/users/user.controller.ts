import CatchAsync from "../../utils/CatchAsync";
import { userService } from "./user.service";

 
const getUsers = CatchAsync(async (req, res) => {
  const { search, page, role } = req.query;

  const result = await userService.getUsersIntoDb({ search, page, role });

  res.status(200).json({
    message: "users retrive successfully!",
    status: 200,
    data: result,
  });
});

const getUser = CatchAsync(async (req, res) => {
  const userId = req.user._id;

  const result = await userService.getSingleUserIntoDb(userId);

  res.status(200).json({
    message: "User Data Retrive Success!",
    success: true,
    status: 200,
  });
});

const updateUserByUser = CatchAsync(async (req, res) => {
  const { userId, firstName, lastName, shippingAddress, billingAddress } =
    req.body;

  const result = await userService.updateUserByUserIntoDb(
    {
      firstName,
      lastName,
      shippingAddress,
      billingAddress,
    },
    userId
  );

  res.status(200).json({
    message: "User Data Update Success!",
    success: true,
    status: 200,
    data: result,
  });
});

const updateUserByAdmin = CatchAsync(async (req, res) => {
  const { userId, ...updateData } = req.body;

  const result = await userService.updateUserByAdminIntoDb(updateData, userId);

  res.status(200).json({
    message: "User Data Update Success!",
    success: true,
    status: 200,
    data: result,
  });
});

export const userController = {
  getUsers,
  getUser,
  updateUserByUser,
  updateUserByAdmin,
};
