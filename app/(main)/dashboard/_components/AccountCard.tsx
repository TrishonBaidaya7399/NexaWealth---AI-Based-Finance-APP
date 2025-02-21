import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useCurrencyIcon } from "@/helpers/useCurrencyIcon";
import { TAccount } from "@/types/accountType";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  account: TAccount;
};

function AccountCard({ account }: Props) {
  const { name, type, id, balance, isDefault, currency } = account;

  return (
    <div className="account_card">
      <Card className="hover:shadow-lg transition-shadow cursor-pointer group relative">
        <Link href={`/account/${id}`}>
          <CardHeader className="flex flex-row space-y-0 justify-between items-center pb-2">
            <CardTitle className="text-sm font-medium capitalize">
              {name}
            </CardTitle>
            <Switch checked={isDefault} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {useCurrencyIcon(currency)}
              {parseFloat(balance.toString()).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}{" "}
              Account
            </p>
          </CardContent>
          <CardFooter className="flex flex-row justify-between items-center text-sm text-muted-foreground">
            <div className="flex items-center">
              <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              Income
            </div>
            <div className="flex items-center">
              <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
              Expense
            </div>
          </CardFooter>
        </Link>
      </Card>
    </div>
  );
}

export default AccountCard;
