import dynamic from "next/dynamic";

const ConnectButtonWrapper = dynamic(() => import("./connectButtonWrapper"), {
  ssr: false,
});

import Link from "next/link";

export const Nav = () => {
  return (
    <nav>
      <div className="fixed z-[900] h-[75px] w-full min-w-[350px] bg-white shadow-sm">
        <div className="mx-auto flex size-full justify-between  max-w-[1600px] flex-row items-center gap-[15px] px-6 lg:gap-[30px]">
          <div className="relative mr-[20px] h-[45px] max-w-[180px] md:h-[60px] md:max-w-[240px]">
            <div className="relative z-10 flex size-full max-w-[180px] flex-col items-center justify-center md:max-w-[240px]">
              <Link href="/">
                <img
                  src="/assets/wordmark.png"
                  loading="lazy"
                  className="object-contain max-h-[25px]"
                  alt=""
                />
              </Link>
            </div>
          </div>
          <ConnectButtonWrapper />
        </div>
      </div>
    </nav>
  );
};
