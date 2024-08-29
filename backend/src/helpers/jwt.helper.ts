import jwt from "jsonwebtoken";
import { configENV } from "@/config";

export class JwtHelper {
  private static jwtSecret = configENV.jwtSecret;

  static generateToken(payload: object, recall: boolean, include?: boolean) {
    if (this.jwtSecret) {
      const accessToken = jwt.sign(payload, this.jwtSecret, {
        expiresIn: recall ? "24h" : "1h", // accessToken
      });

      if (include === true) {
        const refreshToken = jwt.sign(payload, this.jwtSecret, {
          expiresIn: recall ? "30d" : "1d", // refreshToken
        });
        return { accessToken, refreshToken };
      }

      return { accessToken };
    }
    throw new Error("JWT secret is not defined");
  }

  static verifyToken(token: string): any {
    if (!this.jwtSecret) {
      throw new Error("JWT secret is not defined");
    }

    try {
      return jwt.verify(token, this.jwtSecret);
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error("Token has expired");
      } else if (error instanceof jwt.JsonWebTokenError) {
        throw new Error("Invalid token");
      } else {
        throw new Error("Internal server error during token verification");
      }
    }
  }

  static decodeToken(token: string): any {
    return jwt.decode(token);
  }
}
