import dotEnv from "dotenv";

dotEnv.config();

const Config = {
  PORT: process.env.PORT,
  DatabaseUrl: process.env.MONGODB_URL,
  jwt_Secret: process.env.JWT_Secret,
  FRONTEND_URL: process.env.FRONTEND_URL,
};

export default Config;
