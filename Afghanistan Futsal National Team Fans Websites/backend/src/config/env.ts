import dotenv from "dotenv";

dotenv.config({ quiet: true });

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 4000,
  jwtSecret: process.env.JWT_SECRET || "",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1d",
  bcryptSaltRounds: Number(process.env.BCRYPT_SALT_ROUNDS) || 12,
  corsOrigins: (process.env.CORS_ORIGIN || "http://127.0.0.1:3000,http://localhost:3000")
    .split(",")
    .map((origin) => origin.trim()),
  databaseUrl: process.env.DATABASE_URL || ""
};

export default env;
