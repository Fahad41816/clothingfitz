import Config from "../../app/Config";
import CatchAsync from "../../utils/CatchAsync";
import { MUser } from "../users/user.model";
import { authService } from "./auth.services";
import crypto from "crypto";
import jwt from "jsonwebtoken";

// Register User
const RegisterUser = CatchAsync(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    authProvider,
    googleId,
    appleId,
  } = req.body;

  // Basic Validation: If email auth, password is mandatory
  if (authProvider === "email" && !password) {
    return res.status(400).json({
      success: false,
      message: "Password is required for email registration.",
    });
  }

  // Call Service
  const user = await authService.createUser({
    firstName,
    lastName,
    email,
    password, // We send the raw password; Model will hash it
    authProvider,
    googleId,
    appleId,
  });

  // 🛡️ Security: Remove password from response
  const userResponse = user.toObject();
  delete userResponse.password;

  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: userResponse,
  });
});

// Login User
const LoginUser = CatchAsync(async (req, res) => {
  const { email, password } = req.body;

  // 1. Validate Input
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  // 2. Find User & Explicitly Get Password
  // We MUST use .select('+password') because in schema we set select: false
  const user = await MUser.findOne({ email }).select("+password");

  // Check if user exists
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  // 3. Check if Password Matches
  // This calls the custom method we wrote in the User Model
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  // 4. Generate JWT Token
  // Make sure you have JWT_SECRET in your .env file
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    Config.jwt_Secret as string,
    { expiresIn: "7d" }
  );

  // 5. Send Response
  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    data: {
      accessToken: token,
    },
  });
});

// login user by social Login
const LoginBySocial = CatchAsync(async (req, res) => {
  // 1. Get data from Frontend
  // The frontend must send 'socialId' and 'authProvider' (e.g., "google")
  const { firstName, lastName, email, socialId, authProvider, image } =
    req.body;

  // 2. Validate essential data
  if (!email || !socialId || !authProvider) {
    res.status(400).json({
      success: false,
      message: "Email, socialId, and authProvider are required",
    });
    return;
  }

  // 3. Find if the user exists (Search by EMAIL is safest)
  // Why Email? Because if they signed up with email/password before,
  // we don't want to create a duplicate account. We want to LINK them.
  let user: any = await MUser.findOne({ email });

  if (user) {
    // --- CASE A: User Exists (Login) ---

    // Check if we need to "Link" the social ID to this existing account
    let isModified = false;

    if (authProvider === "google" && !user.googleId) {
      user.googleId = socialId;
      isModified = true;
    } else if (authProvider === "apple" && !user.appleId) {
      user.appleId = socialId;
      isModified = true;
    }

    // If we linked a new ID, save the user
    if (isModified) {
      // Update auth provider to reflect the most recent login method (optional)
      user.authProvider = authProvider;
      await user.save();
    }
  } else {
    // --- CASE B: User Does Not Exist (Register) ---

    // Prepare the new user data
    const newUserData: any = {
      firstName,
      lastName,
      email,
      authProvider,
      isVerified: true, // Social logins usually provide verified emails
      role: "user",
      // Dynamically set the ID based on provider
      ...(authProvider === "google" && { googleId: socialId }),
      ...(authProvider === "apple" && { appleId: socialId }),
    };

    // Create the user in database
    user = await MUser.create(newUserData);
  }

  // 4. Generate JWT Token (Same as standard login)
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  // 5. Send Response
  res.status(200).json({
    success: true,
    message: "Social login successful",
    data: {
      accessToken: token,
    },
  });
});

// Forget PassUser
const forgetPassword = CatchAsync(async (req, res) => {
  const { email } = req.body;

  // 1. Check if user exists
  const user: any = await MUser.findOne({ email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found!",
    });
  }

  // 2. Generate a Random Reset Token
  // We send the 'resetToken' to the user via email
  const resetToken = crypto.randomBytes(32).toString("hex");

  // 3. Hash the token and save it to DB (Security Best Practice)
  // We store the encrypted version in the DB so if DB is hacked, tokens are safe
  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // 4. Set Expiration (e.g., 10 Minutes from now)
  user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;

  // 5. Save the user (skip validation to avoid errors on other missing fields)
  await user.save({ validateBeforeSave: false });

  // 6. Create the Reset URL (Point this to your Frontend Page)
  // Example: http://localhost:3000/reset-password/5b4f7...
  const resetUrl = `${Config.FRONTEND_URL}/reset-password/${resetToken}`;

  const message = `
    You have requested a password reset. 
    Please go to this link to reset your password: \n\n 
    ${resetUrl} \n\n 
    This link will expire in 10 minutes.
  `;

  try {
    // 7. Send the Email
    await sendEmail({
      email: user.email,
      subject: "Password Reset Request",
      message: message,
    });

    res.status(200).json({
      success: true,
      message: "Email sent successfully!",
    });
  } catch (error) {
    // 8. If Email fails, delete the token from DB so the user isn't locked
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return res.status(500).json({
      success: false,
      message: "Email could not be sent. Please try again.",
    });
  }
});

// Password Change User
const resetPassword = CatchAsync(async (req, res) => {
  // 1. Get the token from the URL params and new password from body
  const { token } = req.params;
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({
      success: false,
      message: "Please provide a new password",
    });
  }

  // 2. Hash the received token to compare with the DB version
  // We stored it as a hash, so we must query it as a hash.
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  // 3. Find user with this token AND check if it hasn't expired ($gt = Greater Than)
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  // 4. If no user found, the token is invalid or expired
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Token is invalid or has expired",
    });
  }

  // 5. Set the new password
  // Mongoose will automatically hash this because of your pre-save hook!
  user.password = password;

  // 6. Clear the reset token fields (User is verified now)
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  // 7. Save the updated user
  await user.save();

  // 8. Send Success Response
  // Optional: You can also generate a new JWT here and log them in immediately
  res.status(200).json({
    success: true,
    message: "Password changed successfully! You can now login.",
  });
});

export const AuthController = {
  RegisterUser,
  LoginUser,
  LoginBySocial,
  forgetPassword,
  resetPassword,
};
