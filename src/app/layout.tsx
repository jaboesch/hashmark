import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { Nav } from "@/components/nav";
import RootContainer from "@/components/rootContainer";

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
      <body className={clsx("flex min-h-screen px-4", inter.className)}>
        <Nav />
        <RootContainer>{children}</RootContainer>
      </body>
    </html>
  );
}