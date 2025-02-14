"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="fixed top-4 w-[calc(100%-2rem)] max-w-[1200px] border font-roman border-custom-teal text-white rounded-3xl px-6 py-2 shadow-lg flex items-center justify-between backdrop-blur-3xl left-1/2 -translate-x-1/2 md:w-full md:mx-0">
      <Link href="/" className="flex-shrink-0">
        <Image
          src="/logo.svg"
          alt="logo"
          height={100}
          width={100}
          className="w-[50px] h-auto md:w-[100px]"
        />
      </Link>

      <div className="hidden md:flex flex-1 justify-center space-x-10 text-base">
        <Link href="/" className="hover:text-gray-300 transition">
          Events
        </Link>
        <Link href="/" className="hover:text-gray-300 transition">
          My Tickets
        </Link>
        <Link href="/" className="hover:text-gray-300 transition">
          About Project
        </Link>
      </div>

      <Button className="ml-auto bg-white text-black text-xs font-medium md:px-4 px-2 py-2 rounded-lg shadow-md hover:bg-gray-200 transition">
        MY TICKETS →
      </Button>
    </nav>
  );
};

export default Navbar;
