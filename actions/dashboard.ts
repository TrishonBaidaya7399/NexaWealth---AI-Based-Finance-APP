"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { accountSchema } from "@/app/lib/schema";
import { EAccountType, ECurrency, TAccount } from "@/types/accountType";

// interface Account {
//   id: string;
//   name: string;
//   type: EAccountType;
//   balance: number;
//   isDefault: boolean;
//   userId: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

interface SerializedAccount {
  id: string;
  name: string;
  type: EAccountType;
  balance: number;
  isDefault: boolean;
  userId: string;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
  transactionsCount?: number;
  currency: ECurrency;
}

const serializeTransaction = (
  obj: Partial<TAccount> & { transactionsCount?: number }
): SerializedAccount => {
  const serialized: SerializedAccount = {
    id: obj.id || "",
    name: obj.name || "",
    type: obj.type || EAccountType.CURRENT,
    balance: obj.balance !== undefined ? Number(obj.balance) : 0,
    isDefault: obj.isDefault || false,
    userId: obj.userId || "",
    currency: obj.currency || ECurrency.USD,
    createdAt: obj.createdAt ? new Date(obj.createdAt) : undefined,
    updatedAt: obj.updatedAt ? new Date(obj.updatedAt) : undefined,
    transactionsCount:
      obj.transactionsCount !== undefined
        ? Number(obj.transactionsCount)
        : undefined,
  };

  return serialized;
};

// create user account ---------------------------------------------------------------------------
export const createAccount = async (data: z.infer<typeof accountSchema>) => {
  console.log("Received Data:", data);

  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized!" };
    }

    const user = await db.user.findUnique({ where: { clerkUserId: userId } });
    if (!user) {
      return { success: false, error: "Unauthorized!" };
    }

    const parsedData = accountSchema.parse(data);
    const balanceInt = parseInt(parsedData.balance, 10);
    if (isNaN(balanceInt)) {
      return { success: false, error: "Invalid balance amount" };
    }

    // Check if this is the user's first account
    const existingAccounts = await db.account.findMany({
      where: { userId: user.id },
    });

    // Determine if this account should be default
    const shouldBeDefault =
      existingAccounts.length === 0 ? true : parsedData.isDefault;

    // Unset other default accounts if the new one is default
    if (shouldBeDefault) {
      await db.account.updateMany({
        where: { userId: user.id, isDefault: true },
        data: { isDefault: false },
      });
    }

    const account = await db.account.create({
      data: {
        name: parsedData.name,
        type: parsedData.type,
        balance: balanceInt,
        isDefault: shouldBeDefault,
        userId: user.id,
      },
    });

    revalidatePath("/dashboard");

    return { success: true, data: serializeTransaction(account) };
  } catch (error) {
    console.error("Error creating account:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
};

// Get all user accounts ---------------------------------------------------------------------------

export const getUserAccount = async () => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized!" };
    }

    const user = await db.user.findUnique({ where: { clerkUserId: userId } });
    if (!user) {
      return { success: false, error: "Unauthorized!" };
    }

    // Get all accounts from DB
    const accounts = await db.account.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { transactions: true },
        },
      },
    });

    const serializedAccounts: SerializedAccount[] = accounts.map(
      (account: TAccount & { _count: { transactions: number } }) =>
        serializeTransaction({
          ...account,
          transactionsCount: account._count.transactions,
        })
    );

    return { success: true, data: serializedAccounts };
  } catch (error) {
    console.error("Error fetching accounts:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
};
