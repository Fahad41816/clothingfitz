import { MUser } from "../users/user.model";
import { TUser } from "../users/users.interface";

const createUser = async (userData: Partial<TUser>) => {
  const existingUser = await findExistingUser(
    userData.email!,
    userData.googleId,
    userData.appleId
  );

  if (existingUser) {
    if (existingUser.email === userData.email) {
      throw new Error("Email already in use.");
    }
    if (userData.googleId && existingUser.googleId === userData.googleId) {
      throw new Error("Google Account already linked.");
    }
    if (userData.appleId && existingUser.appleId === userData.appleId) {
      throw new Error("Apple Account already linked.");
    }
  }

  // 2. Create User (Password hashing is handled by the Model pre-save hook)
  const newUser = await MUser.create(userData);
  return newUser;
};


export const authService = {
  createUser,
};
