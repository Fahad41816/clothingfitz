import mongoose, { Schema } from "mongoose";
import { TUser } from "./users.interface";
import bcrypt from "bcryptjs";

const AddressSchema = new Schema(
  {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: String },
    country: { type: String },
  },
  { _id: false }
);

const UserSchema = new Schema<TUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },

    password: {
      type: String,
      required: function (this: TUser) {
        return this.authProvider === "email";
      },
    },
    authProvider: {
      type: String,
      enum: ["email", "google", "apple"],
      default: "email",
      required: true,
    },
    googleId: { type: String, unique: true, sparse: true },
    appleId: { type: String, unique: true, sparse: true },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    verificationTokenExpires: { type: Date },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    shippingAddress: { type: AddressSchema, default: {} },
    billingAddress: { type: AddressSchema, default: {} },
    phone: { type: String },
    role: {
      type: String,
      enum: ["user", "admin", "employ"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (this: TUser) {
  if (!this.isModified("password") || !this.password) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  if (!this.password) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

export const MUser = mongoose.model("User", UserSchema);
