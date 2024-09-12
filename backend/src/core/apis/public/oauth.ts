import { Request, Response, Router } from "express";
import passport from "passport";
const router = Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req: Request, res: Response) => {
    if (req.user && "accessToken" in req.user) {
      const { accessToken, refreshToken } = req.user as {
        accessToken: string;
        refreshToken: string;
        user: object;
      };

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });
      
      res.redirect(`http://localhost:5173/?token=${accessToken}`);
    } else {
      res
        .status(401)
        .json({ status: false, message: "Authentication failed", data: null });
    }
  }
);

export default router;
