import { getUserAccount } from "@/actions/dashboard";
import CreateAccountDrawer from "@/components/dashboard/CreateAccountDrawer";
import { Card, CardContent } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import React from "react";
import AccountCard from "./_components/AccountCard";

const Dashboard = async () => {
  const accounts = await getUserAccount();
  console.log({ accounts });
  return (
    <div className="px-5">
      {/* Budget progress */}
      {/* Overview */}
      {/* Accounts Grid */}
      <div className="dashboard_account_section grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CreateAccountDrawer>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-dashed h-full">
            <CardContent className="flex flex-col items-center justify-center p-5 gap-2 text-muted-foreground h-full">
              <PlusIcon className="h-10 w-10" />
              <p className="text-sm font-medium">Add New Account</p>
            </CardContent>
          </Card>
        </CreateAccountDrawer>
        {/*  render all the accounts */}
        {accounts.data && accounts.data.length > 0 ? (
          accounts.data.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))
        ) : (
          <p>No accounts found</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
