"use client";
import React, { useState, ReactNode } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
function CreateAccountDrawer({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<{
    name: string;
    type: "CURRENT" | "SAVINGS";
    balance: string;
    isDefault: boolean;
  }>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: "",
      type: "CURRENT",
      balance: "",
      isDefault: false,
    },
  });
  const onSubmit = async (data: any) => {
    console.log(data);
  };
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
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
                <p className="text-sm text-red-500">{errors?.name?.message}</p>
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
                <p className="text-sm text-red-500">{errors?.type?.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="balance" className="text-sm font-medium">
                Initial Balance
              </label>
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
            <div className="flex items-center justify-between rounded-lg border p-3 flex-row gap-1">
              <div className="space-y-0.5">
                <label
                  htmlFor="isDefault"
                  className="text-sm font-medium cursor-pointer"
                >
                  Set as Default
                </label>
                <p>This account will be selected by default for transaction</p>
              </div>
              <Switch
                id="isDefault"
                onCheckedChange={(checked) => setValue("isDefault", checked)}
                checked={watch("isDefault")}
              />
            </div>
            <div className="w-full border-t-[1px] border-gray-300 pt-3 flex items-center justify-center">
              <div className="flex flex-row items-center justify-center gap-6 w-full md:w-[50%] lg:w-[30%] ">
                <DrawerClose asChild>
                  <Button
                    type="button"
                    variant={"destructive"}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </DrawerClose>
                <Button type="submit" className="flex-1">
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default CreateAccountDrawer;
