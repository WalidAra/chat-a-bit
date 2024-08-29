import { Error500 } from "@/constants";
import { JwtHelper } from "@/helpers";
import { Request, Response, NextFunction } from "express";

const checkAuth = (
  req: Request & { user?: string },
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Authentication failed: No token provided",
        status: false,
        data: null,
      });
    }

    const decoded = JwtHelper.verifyToken(token);

    req.user = decoded;
    next();
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      (error.message === "Invalid token" ||
        error.message === "Token has expired")
    ) {
      return res.status(401).json({
        message: "Authentication failed: Invalid token",
        status: false,
        data: null,
      });
    } else {
      return res.status(500).json(Error500);
    }
  }
};

export default checkAuth;
