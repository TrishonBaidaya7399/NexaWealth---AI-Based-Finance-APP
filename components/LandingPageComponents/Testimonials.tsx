import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { testimonialsData } from "@/data/landing";
import Image from "next/image";

function TestimonialSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="capitalize text-3xl font-bold text-center mb-12">
          What our users say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData?.map((data, i) => (
            <Card
              key={i}
              className="p-6 bg-blue-50 backdrop-blur-sm shadow-md shadow-blue-100 hover:bg-blue-200 duration-300"
            >
              <CardContent className=" pt-4 flex flex-col gap-2">
                <div className="flex flex-row items-center gap-2">
                  <Image
                    src={data?.image}
                    alt={data?.name}
                    height={60}
                    width={60}
                    className="rounded-full border-2 border-blue-500"
                  />
                  <div className="flex flex-col items-start">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {data?.name}
                    </h3>
                    <h3 className="text-gray-600">{data?.role}</h3>
                  </div>
                </div>
                <p className="text-gray-600">{data?.quote}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialSection;
