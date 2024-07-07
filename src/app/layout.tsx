import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { Nav } from "@/components/nav";
import RootContainer from "@/components/rootContainer";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hashmark",
  description: "Hashmark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="flex min-h-screen">
            <Nav />
            <RootContainer>{children}</RootContainer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
