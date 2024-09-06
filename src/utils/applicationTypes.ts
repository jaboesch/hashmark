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

export type BlogPostMetadata = {
  title: string; // ideally 50-60 characters and including the primary keyword
  description: string; // ideally 100-160 characters and including some keywords
  keywords: string; // 3-5 keywords comma and space separated (word1, phrase 2, word3)
  coverImageUrl: string;
  authorName: string;
  slug: string;
  canonicalUrlPrefix: string;
  publication: string;
};

export type BlogPostDraft = BlogPostMetadata & {
  localStorageId: string;
  htmlContent: string;
};

export type BlogPostPublished = BlogPostMetadata & {
  transactionId: string;
  authorAddress: `0x${string}`;
  datePublishedInMs: number;
  resourceUrl: string;
};

export type BlogPost = BlogPostDraft | BlogPostPublished;

export const isDraft = (post: BlogPost): post is BlogPostDraft =>
  (post as BlogPostDraft).localStorageId !== undefined;

export const isPublished = (post: BlogPost): post is BlogPostPublished =>
  (post as BlogPostPublished).transactionId !== undefined;
