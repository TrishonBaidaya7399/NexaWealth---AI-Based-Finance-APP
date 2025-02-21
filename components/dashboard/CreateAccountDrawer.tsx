"use client";

import React, { useState, ReactNode, useEffect } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { accountSchema } from "@/app/lib/schema";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import useFetch from "@/hooks/useFetch";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useFormChangeObserver } from "@/helpers/useFormChangeObserver";
import { createAccount } from "@/actions/dashboard";

type FormData = z.infer<typeof accountSchema>;

function CreateAccountDrawer({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: "",
      type: "CURRENT",
      balance: "0",
      isDefault: false,
      currency: "USD",
    },
  });

  const { isFormDirty } = useFormChangeObserver(watch, {
    name: "",
    type: "CURRENT",
    balance: "0",
    isDefault: false,
    currency: "USD",
  });

  const {
    data: newAccount,
    error,
    loading: creatingAccount,
    fetchData: createAccountFn,
  } = useFetch(createAccount);

  useEffect(() => {
    if (newAccount && !creatingAccount) {
      toast.success("Account created successfully");
      reset();
      setOpen(false);
    }
  }, [newAccount, creatingAccount, reset]);

  useEffect(() => {
    if (error) {
      toast.error("Failed to create account");
    }
  }, [error]);

  const onSubmit = async (data: FormData): Promise<void> => {
    await createAccountFn(data);
  };

  const handleClose = (openState: boolean) => {
    if (!openState && isFormDirty) {
      if (
        !confirm("You have unsaved changes. Are you sure you want to close?")
      ) {
        return;
      }
    }
    setOpen(openState);
    if (!openState) reset();
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>

      <Drawer open={open} onOpenChange={handleClose}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Create New Account</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-4">
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-sm font-medium">
                  Account Name
                </label>
                <Input
                  id="name"
                  placeholder="e.g., Main Checking"
                  {...register("name")}
                />
                {errors?.name && (
                  <p className="text-sm text-red-500">
                    {errors?.name?.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="type" className="text-sm font-medium">
                  Account Type
                </label>
                <Select
                  onValueChange={(value: "CURRENT" | "SAVINGS") =>
                    setValue("type", value)
                  }
                  defaultValue={watch("type")}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CURRENT">Current Account</SelectItem>
                    <SelectItem value="SAVINGS">Savings Account</SelectItem>
                  </SelectContent>
                </Select>
                {errors?.type && (
                  <p className="text-sm text-red-500">
                    {errors?.type?.message}
                  </p>
                )}
              </div>
              <div className="flex flex-row items-center gap-1">
                {/* Balance Input */}
                <div className="w-fit-content flex flex-col gap-1 flex-grow">
                  <label htmlFor="balance" className="text-sm font-medium">
                    Initial Balance
                  </label>
                  <Select
                    onValueChange={(value) => setValue("currency", value)}
                    defaultValue={watch("currency")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="USD" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="BDT">BDT (৳)</SelectItem>
                      <SelectItem value="INR">INR (₹)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="CNY">CNY (¥)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="JPY">JPY (¥)</SelectItem>
                      <SelectItem value="CAD">CAD (C$)</SelectItem>
                      <SelectItem value="AUD">AUD (A$)</SelectItem>
                      <SelectItem value="SGD">SGD (S$)</SelectItem>
                      <SelectItem value="CHF">CHF (Fr)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Currency Selector */}
                <div className="w-full mt-[22px]">
                  <Input
                    id="balance"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register("balance")}
                  />
                  {errors?.balance && (
                    <p className="text-sm text-red-500">
                      {errors?.balance?.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-3 flex-row gap-1">
                <div className="space-y-0.5">
                  <label
                    htmlFor="isDefault"
                    className="text-sm font-medium cursor-pointer"
                  >
                    Set as Default
                  </label>
                  <p>
                    This account will be selected by default for transactions
                  </p>
                </div>
                <Switch
                  id="isDefault"
                  onCheckedChange={(checked) => setValue("isDefault", checked)}
                  checked={watch("isDefault")}
                />
              </div>
              <div className="w-full border-t-[1px] border-gray-300 pt-3 flex items-center justify-center">
                <div className="flex flex-row items-center justify-center gap-6 w-full md:w-[50%] lg:w-[30%]">
                  <DrawerClose asChild>
                    <Button
                      type="button"
                      variant={"destructive"}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </DrawerClose>
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={creatingAccount}
                  >
                    {creatingAccount ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default CreateAccountDrawer;
