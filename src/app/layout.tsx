import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/nav";
import RootContainer from "@/components/rootContainer";
import Providers from "./providers";
import { HASHMARK_COVER_IMAGE_URL } from "@/utils/applicationConstants";

export const metadata: Metadata = {
  title: "Hashmark",
  description:
    "Hashmark is a decentralized blogging tool with no business model.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.hashmark.xyz",
    siteName: "Hashmark",
    title: "Hashmark",
    description:
      "Hashmark is a decentralized blogging tool with no business model.",
    images: [
      {
        url: HASHMARK_COVER_IMAGE_URL,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
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
