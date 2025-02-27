import { featuresData } from "@/data/landing";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

function FeaturedSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="capitalize text-3xl font-bold text-center mb-12">
          Everything you need to manage your finances
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData?.map((data, i) => (
            <Card
              key={i}
              className="p-6 bg-blue-50 backdrop-blur-sm shadow-md shadow-blue-100 hover:bg-blue-200 duration-300"
            >
              <CardContent className="space-y-4 pt-4">
                {data?.icon}
                <h3 className="text-xl font-semibold">{data?.title}</h3>
                <p className="text-gray-600">{data?.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedSection;
