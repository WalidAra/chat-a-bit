import { Response, Request } from "express";
import { JwtHelper } from "@/helpers";
import bcrypt from "bcrypt";
import { prisma } from "@/config";
import { userSelection } from "@/constants";
import destructUser from "@/scripts/destructUser";
import { asyncHandler } from "@/scripts/asyncHandler";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, name, recall } = req.body as {
    email: string;
    password: string;
    name: string;
    recall: boolean;
  };

  if (!email || !password) {
    return res.status(400).json({
      status: false,
      message: "Email and password are required",
      data: null,
    });
  }

  const isUser = await prisma.user.findUnique({
    where: {
      email,
      provider: "DIRECT",
    },
  });

  if (isUser) {
    return res.status(400).json({
      status: false,
      message: "User already exists",
      data: null,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      provider: "DIRECT",
    },

    select: userSelection,
  });

  const { accessToken, refreshToken } = JwtHelper.generateToken(
    { id: user.id, recall },
    recall,
    true
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });

  return res.status(201).json({
    status: true,
    message: "User created successfully",
    data: {
      ...user,
      accessToken,
    },
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, recall } = req.body as {
    email: string;
    password: string;
    recall: boolean;
  };

  const isUser = await prisma.user.findUnique({
    where: {
      email,
      provider: "DIRECT",
    },
    select: { ...userSelection, password: true },
  });

  if (!isUser) {
    return res.status(404).json({
      status: false,
      message: "User does not exist",
      data: null,
    });
  }

  const match = await bcrypt.compare(password, isUser.password);

  if (!match) {
    return res.status(401).json({
      status: false,
      message: "Invalid credentials",
      data: null,
    });
  }

  const { accessToken, refreshToken } = JwtHelper.generateToken(
    { id: isUser.id, recall },
    recall,
    true
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });
  const user = destructUser(isUser);

  res.status(200).json({
    status: true,
    message: "User logged in successfully",
    data: {
      ...user,
      accessToken,
    },
  });
});

export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(404).json({
      status: false,
      message: "Unauthorized - No token provided",
      data: null,
    });
  }

  const { id, recall } = JwtHelper.verifyToken(refreshToken);
  const { accessToken } = JwtHelper.generateToken({ id }, recall, false);

  res.status(201).json({
    status: true,
    message: "Token refreshed successfully",
    data: {
      accessToken,
    },
  });
});

export const LogOut = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  });

  res.status(200).json({
    status: true,
    message: "User logged out successfully",
    data: null,
  });
});
