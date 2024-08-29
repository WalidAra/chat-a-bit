import dotenv from "dotenv";
dotenv.config();

 const configENV = {
  port: process.env.PORT || 8080,
  nodeEnv: process.env.NODE_ENV || "development",
  jwtSecret: process.env.JWT_SECRET,
};
export default configENV;