import React from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/logo/logo.png";
import { HandCoins, LayoutDashboard } from "lucide-react";
import { checkUser } from "@/lib/checkUser";
const TopHeader = async () => {
  await checkUser();
  return (
    <div className="h-[70px] z-10 backdrop-blur-sm bg-opacity-80 fixed top-0 bg-blue-100 w-full border-b-[1px] border-blue-100">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="logo">
          <nav>
            <Link href={"/"} className="flex flex-row items-center gap-0">
              <Image
                height={60}
                width={60}
                src={logo}
                unoptimized
                alt="logo"
                className="h-12 w-auto object-contain"
              />
              <h2 className="text-3xl text-blue-700 font-bold font-mono">
                NexaWealth
              </h2>
            </Link>
          </nav>
        </div>

        <div className="user_dropdown flex items-center gap-6 md:gap-10">
          <SignedIn>
            <div className="options flex flex-row items-center gap-6 md:gap-10">
              <Link href={"/dashboard"}>
                <div className="flex flex-row items-center gap-1 text-xl border-b-2 border-transparent hover:text-blue-900 text-gray-500 hover:border-b-2 hover:border-blue-900  duration-300">
                  <LayoutDashboard size={18} />
                  <span className="hidden md:block">Dashboard</span>
                </div>
              </Link>
              <Link href={"/transactions/create"}>
                <div className="flex flex-row items-center gap-1 text-xl border-b-2 border-transparent hover:text-blue-900 text-gray-500 hover:border-b-2 hover:border-blue-900  duration-300">
                  <HandCoins size={18} />
                  <span className="hidden md:block">Transactions</span>
                </div>
              </Link>
            </div>
          </SignedIn>
          <SignedOut>
            <SignInButton forceRedirectUrl={"/dashboard"}>
              <button className="group relative flex w-[115px] h-10 items-center rounded-lg border-2 border-blue-900 p-4 text-blue-900">
                <span>Login</span>
                <span className="absolute right-3 box-content flex w-8 justify-center rounded-md bg-blue-900 duration-300 group-hover:w-[90px] h-8 hover:h-8 items-center">
                  <svg
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    id="fi_12181958"
                    height={24}
                    width={24}
                  >
                    <g id="Layer_2" data-name="Layer 2">
                      <path
                        d="m26 29h-5a1 1 0 0 1 0-2h5a1 1 0 0 0 1-1v-20a1 1 0 0 0 -1-1h-5a1 1 0 0 1 0-2h5a3 3 0 0 1 3 3v20a3 3 0 0 1 -3 3z"
                        fill="#fff"
                      ></path>
                      <path
                        d="m23.707 16.707-5 5a1 1 0 0 1 -1.414-1.414l3.293-3.293h-16.586a1 1 0 0 1 0-2h16.586l-3.293-3.293a1 1 0 0 1 1.414-1.414l5 5a1 1 0 0 1 0 1.414z"
                        fill="#fff"
                      ></path>
                    </g>
                  </svg>
                </span>
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox:
                    "w-10 h-10 border-[3px] rounded-full duration-300 border-[transparent] hover:border-blue-900",
                },
              }}
            />
          </SignedIn>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
