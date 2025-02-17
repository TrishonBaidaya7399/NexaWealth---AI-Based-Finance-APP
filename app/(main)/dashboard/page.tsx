import CreateAccountDrawer from "@/components/dashboard/CreateAccountDrawer";
import { Card, CardContent } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import React from "react";

const Dashboard = () => {
  return (
    <div className="px-5">
      {/* Budget progress */}
      {/* Overview */}
      {/* Accounts Grid */}
      <div className="dashboard_account_section grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CreateAccountDrawer>
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed">
            <CardContent className="flex flex-col items-center justify-center p-5 gap-2 text-muted-foreground h-full">
              <PlusIcon className="h-10 w-10" />
              <p className="text-sm font-medium">Add New Account</p>
            </CardContent>
          </Card>
        </CreateAccountDrawer>
      </div>
    </div>
  );
};

export default Dashboard;
