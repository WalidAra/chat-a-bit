import { prisma } from "@/config";
import { userSelection } from "@/constants";
import { JwtHelper } from "@/helpers";
import { generateRandomChars } from "@/scripts";

export const getUserByID = async (id: string) => {
  return await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: userSelection,
  });
};

export const searchUsersByName = async (name: string) => {
  return await prisma.user.findMany({
    where: {
      name: {
        contains: name,
        mode: "insensitive",
      },
    },
    select: userSelection,
  });
};

export const handleGoogleOAuth = async (profile: any) => {
  const { displayName, emails, photos } = profile;
  const email = emails[0].value;
  const image = photos[0].value;

  try {
    const isUser = await prisma.user.findUnique({
      where: {
        email: email,
        provider: "GOOGLE",
      },
    });

    if (!isUser) {
      const pwHash = generateRandomChars(16);
      const user = await prisma.user.create({
        data: {
          name: displayName,
          email: email,
          password: pwHash,
          image: image,
          provider: "GOOGLE",
        },
        select: userSelection,
      });

      const { accessToken, refreshToken } = JwtHelper.generateToken(
        { id: user.id, recall: true },
        true,
        true
      );

      return {
        ...user,
        accessToken,
        refreshToken,
      };
    }

    const { accessToken, refreshToken } = JwtHelper.generateToken(
      { id: isUser.id, recall: true },
      true,
      true
    );

    return {
      ...isUser,
      accessToken,
      refreshToken,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error handling Google OAuth: ${error.message}`);
    } else {
      throw new Error("Error handling Google OAuth");
    }
  }
};
