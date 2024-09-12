// import { PrismaClient } from "@prisma/client";

// class PrismaInstance {
//   private static instance: PrismaInstance;
//   public prisma: PrismaClient;

//   private constructor() {
//     this.prisma = new PrismaClient();
//   }

//   public static getInstance(): PrismaInstance {
//     if (!PrismaInstance.instance) {
//       PrismaInstance.instance = new PrismaInstance();
//     }
//     return PrismaInstance.instance;
//   }
// }

// export const prisma = PrismaInstance.getInstance().prisma;

// -------------------------------------------------------------------

import { PrismaClient } from "@prisma/client";

const PrismaInstance = Object.freeze({
  prisma: new PrismaClient(),
});

export const prisma = PrismaInstance.prisma;