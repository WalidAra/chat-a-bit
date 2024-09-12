import dotenv from "dotenv";
dotenv.config();

const configENV = {
  port: process.env.PORT || 8080,
  nodeEnv: process.env.NODE_ENV || "development",
  jwtSecret: process.env.JWT_SECRET,

  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleCallbackUrl: process.env.GOOGLE_CALLBACK_URL,
  googleAuthUri: process.env.GOOGLE_AUTH_URI,
  googleTokenUri: process.env.GOOGLE_TOKEN_URI,
  redisUrl: process.env.REDIS_URL,
};

export default configENV;
