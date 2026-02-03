import { Document } from "mongoose";

export type AuthProvider = "email" | "google" | "apple";
export type UserRole = "user" | "admin" | "employ";

// Address Interface (reusable)
export interface TAddress {
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

export interface TUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password?: string; // Optional because Google/Apple users might not have one

  // Auth Providers
  authProvider: AuthProvider;
  googleId?: string;
  appleId?: string;

  // Verification
  isVerified?: boolean;
  verificationToken?: string;
  verificationTokenExpires?: Date;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;

  // Profile Data
  shippingAddress?: TAddress;
  billingAddress?: TAddress;
  phone?: string;
  role: UserRole;

  // Timestamps (Mongoose adds these automatically)
  createdAt: Date;
  updatedAt: Date;

  // 🔒 Methods
  comparePassword(candidatePassword: string): Promise<boolean>;
}
