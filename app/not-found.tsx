"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const NotFound = () => {
  const router = useRouter();
  return (
    <div className="relative h-screen w-screen ">
      {/* Top Right Image */}
      <div className="absolute top-0 right-0  h-[400px] w-[400px]">
        <Image
          width={906}
          height={906}
          src="/404/topRightEllipsis.png"
          alt="Top Right Decoration"
          className="h-full w-full"
        />
      </div>

      {/* Center Content */}
      <div className="absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 text-center">
        <Image
          width={590}
          height={590}
          src="/404/404.png"
          alt="404 Not Found"
          className="h-[500px] w-[500px] md:h-[350px] md:w-[350px] sm:h-[300px] sm:w-[300px]"
        />
        <div className="mt-5 max-w-[700px] md:max-w-[500px] sm:max-w-[400px] xs:max-w-[350px]">
          <h1 className="text-2xl font-semibold text-black">
            Page Lost in Space 🚀
          </h1>
          <p className="mt-4 text-base font-normal text-gray-600">
            Oops! It looks like this page decided to go on an adventure and got
            lost. Don’t worry, we’ll help you find your way back.
          </p>
          <div className="mt-5 flex flex-row items-center justify-center gap-5">
            <Button size={"lg"} variant="default" onClick={() => router.back()}>
              Back
            </Button>
            <Button size={"lg"} onClick={() => router.push(`/`)}>
              Home
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Left Image */}
      <div className="absolute bottom-0 left-0  h-[400px] w-[400px]">
        <Image
          width={906}
          height={906}
          src="/404/bottomLeftEllipsis.png"
          alt="Bottom Left Decoration"
          className="h-full w-full"
        />
      </div>
    </div>
  );
};

export default NotFound;
