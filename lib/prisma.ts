import { PrismaClient } from "@prisma/client";

const prismaClientProperty = "__prisma_instance__"; 

type GlobalWithPrisma = typeof globalThis & {
  [prismaClientProperty]: PrismaClient;
};

const getPrismaClient = (): PrismaClient => {
  if (process.env.NODE_ENV === "production") {
    return new PrismaClient(); 
  } else {
    const globalWithPrisma = globalThis as GlobalWithPrisma;
    if (!globalWithPrisma[prismaClientProperty]) {
      globalWithPrisma[prismaClientProperty] = new PrismaClient();
    }
    return globalWithPrisma[prismaClientProperty];
  }
};

export const db = getPrismaClient();
