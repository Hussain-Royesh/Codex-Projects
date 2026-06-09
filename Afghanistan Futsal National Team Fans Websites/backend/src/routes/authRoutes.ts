import bcrypt from "bcrypt";
import express from "express";
import jwt, { type SignOptions } from "jsonwebtoken";
import env from "../config/env";
import { findUserByEmail, findUserById, toPublicUser } from "../data/users";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/login", async (request, response) => {
  const { email, password } = request.body as {
    email?: string;
    password?: string;
  };

  if (!email || !password) {
    return response.status(400).json({
      message: "Email and password are required"
    });
  }

  const user = findUserByEmail(email);

  if (!user || user.status !== "active") {
    return response.status(401).json({
      message: "Invalid email or password"
    });
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);

  if (!passwordMatches) {
    return response.status(401).json({
      message: "Invalid email or password"
    });
  }

  if (!env.jwtSecret) {
    return response.status(500).json({
      message: "JWT secret is not configured"
    });
  }

  const tokenOptions: SignOptions = {
    expiresIn: env.jwtExpiresIn as SignOptions["expiresIn"]
  };
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    env.jwtSecret,
    tokenOptions
  );

  return response.json({
    message: "Login successful",
    token,
    user: toPublicUser(user)
  });
});

router.get("/me", authenticate, (request, response) => {
  const userId = request.user?.id;
  const user = userId ? findUserById(userId) : null;

  if (!user || user.status !== "active") {
    return response.status(401).json({
      message: "User account is not active"
    });
  }

  return response.json({
    user: toPublicUser(user)
  });
});

export default router;
