"use server";

import { db } from "@/lib/prisma";
import { TUser } from "@/types/userTypes";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const serializedTransaction = (obj) => {
  const serialized = { ...obj };
  if (obj?.balance) {
    serialized.balance = obj?.balance?.toNumber();
  }
};

const createAccount = async (data: TUser) => {
  console.log({ DataInsideCreateAccount: data });
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized!");
    }
    const user = await db.user.findUnique({ where: { clerkUserId: userId } });
    if (!user) {
      throw new Error("Unauthorized!");
    }
    // convert balance to float before saving it to the database
    const balanceFloat = parseFloat(data?.balance);
    if (isNaN(balanceFloat)) {
      throw new Error("Invalid balance amount");
    }
    // check if this the user's first account
    const existingAccount = await db.account.findMany({
      where: { userId: user?.id },
    });

    // if the account should be default unset other default accounts
    const shouldBeDefault =
      existingAccount.length === 0 ? true : data?.isDefault;
    if (shouldBeDefault) {
      await db.account.updateMany({
        where: { userId: user?.id, isDefault: true },
        data: { isDefault: false },
      });
    }

    const account = await db.account.create({
      data: {
        ...data,
        isDefault: shouldBeDefault,
        balance: balanceFloat,
        userId: user?.id,
      },
    });

    const serializedAccount = serializedTransaction(account);
    revalidatePath("/dashboard");
    return { success: true, data: serializedAccount };
  } catch (error) {
    console.error(error);
    throw new Error(error?.message)
    return { success: false, data: [] };
  }
};
export default createAccount;
