"use client";

import Link from "next/link";

export const Nav = () => {
  return (
    <>
      <div className="h-[75px]" />
      <div className="fixed z-[900] h-[75px] w-full min-w-[350px] bg-white shadow-sm">
        <div className="mx-auto flex size-full max-w-[1600px] flex-row items-center gap-[15px] px-6 lg:gap-[30px]">
          <div className="relative mr-[20px] h-[45px] max-w-[180px] md:h-[60px] md:max-w-[240px]">
            <div className="relative z-10 flex size-full max-w-[180px] flex-col items-center justify-center md:max-w-[240px]">
              <Link href="/">Hashmark</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
