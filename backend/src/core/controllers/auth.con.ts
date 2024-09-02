import { Response, Request } from "express";
import { JwtHelper } from "@/helpers";
import bcrypt from "bcrypt";
import { configENV } from "@/config";
import { prisma } from "@/config";
import { userSelection } from "@/constants";
import destructUser from "@/scripts/destructUser";

export const register = async (req: Request, res: Response) => {
  const { email, password, name, recall } = req.body as {
    email: string;
    password: string;
    name: string;
    recall: boolean;
  };

  try {
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
      secure: configENV.nodeEnv === "production",
      sameSite: "strict",
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
  } catch (error) {
    if (error instanceof Error) {
      console.error("~> Error :", error.message);
    } else {
      console.error("An unknown error occurred");
    }
    res.status(500).json({
      status: false,
      message: "Internal server error",
      data: null,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password, recall } = req.body as {
    email: string;
    password: string;
    recall: boolean;
  };

  try {
    const isUser = await prisma.user.findUnique({
      where: {
        email,
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
      secure: configENV.nodeEnv === "production",
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
  } catch (error) {
    if (error instanceof Error) {
      console.error("~> Error :", error.message);
    } else {
      console.error("An unknown error occurred");
    }
    res.status(500).json({
      status: false,
      message: "Internal server error",
      data: null,
    });
  }
};

export const refresh = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken as string;

  try {
    if (!refreshToken) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized",
        data: null,
      });
    }
    const { id, recall } = JwtHelper.decodeToken(refreshToken);
    const { accessToken } = JwtHelper.generateToken({ id }, recall, false);

    res.status(201).json({
      status: true,
      message: "Token refreshed successfully",
      data: {
        accessToken,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("~> Error :", error.message);
    } else {
      console.error("An unknown error occurred");
    }
    res.status(500).json({
      status: false,
      message: "Internal server error",
      data: null,
    });
  }
};
