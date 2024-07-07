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
