/** Combines members of an intersection into a readable type. */

import { WalletClient, Account } from "viem";
import { Config } from "wagmi";

// https://twitter.com/mattpocockuk/status/1622730173446557697?s=20&t=NdpAcmEFXY01xkqU3KO0Mg
export type Evaluate<type> = { [key in keyof type]: type[key] } & unknown;

//Reusable utility type to get the union of all values of an object
export type ObjectValuesUnionType<T> = T[keyof T];

export type ViemClient<
  config extends Config = Config,
  chainId extends config["chains"][number]["id"] = config["chains"][number]["id"]
> = Evaluate<
  WalletClient<
    config["_internal"]["transports"][chainId],
    Extract<config["chains"][number], { id: chainId }>,
    Account
  >
>;

export interface BlogPost {
  user: `0x${string}`;
  title: string;
  status: "Published" | "Draft";
  author: string;
  createdAt: Date;
  resourceUrl: string;
}

export type BlogPostMetadata = {
  title: string; // under 60 characters (50-60), include primary keyword, use as H1
  description: string; // under 160 characters
  keywords: string; // 3-5 keywords comma and space separated (word1, phrase 2, word3)
  canonicalUrl: string; // full url, default to hashmark
  coverImageUrl: string; // full url
  authorName: string; // full name
};
