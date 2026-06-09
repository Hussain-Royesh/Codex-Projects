import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import env from "../config/env";
import type { AuthenticatedUser, UserRole } from "../types/auth";

type TokenPayload = {
  id: string;
  email: string;
  role: UserRole;
};

function getBearerToken(request: Request): string | null {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  return authHeader.split(" ")[1];
}

export function authenticate(request: Request, response: Response, next: NextFunction) {
  const token = getBearerToken(request);

  if (!token) {
    return response.status(401).json({
      message: "Authentication token is required"
    });
  }

  if (!env.jwtSecret) {
    return response.status(500).json({
      message: "JWT secret is not configured"
    });
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret) as TokenPayload;

    request.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role
    };

    return next();
  } catch {
    return response.status(401).json({
      message: "Invalid or expired authentication token"
    });
  }
}

export function authorizeRoles(...allowedRoles: UserRole[]) {
  return (request: Request, response: Response, next: NextFunction) => {
    const user = request.user as AuthenticatedUser | undefined;

    if (!user) {
      return response.status(401).json({
        message: "Authentication is required"
      });
    }

    if (!allowedRoles.includes(user.role)) {
      return response.status(403).json({
        message: "You do not have permission to perform this action"
      });
    }

    return next();
  };
}
