"use client";

import Image from "next/image";
import React from "react";
import { assets } from "@/Assets/assets";
import Link from "next/link";

const Header = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="p-5 md:px-12 lg:px-28">
      <div className="flex justify-between items-center">
        <Image
          src={assets.logo}
          width={180}
          alt=""
          className="w-[130px] sm:w-auto"
        />
        <Link href="/AddBlog/">
          <button
            className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000]"
          >
            Add Blog <Image src={assets.arrow} alt="arrow" />
          </button>
        </Link>
      </div>

      <div className="text-center my-8">
        <h1 className="text-3xl sm:text-5xl font-medium">Latest Blogs</h1>

        <p className="mt-10 max-w-[740px] m-auto text-sm sm:text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
          optio mollitia blanditiis modi ratione deleniti, voluptatem laudantium
          numquam vel cumque.
        </p>

        <form
          className="flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#000000]"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            placeholder="Search Blog"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-4 outline-none w-full"
          />
          <button
            type="submit"
            className="border-l border-black p-4 sm:px-8 hover:bg-gray-600 hover:text-white duration-200"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;

