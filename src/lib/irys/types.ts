import {
  IRYS_NETWORKS,
  IRYS_NODE_URLS,
  IRYS_PAYMENT_TOKEN_NAMES,
  IRYS_PROVIDER_TYPES,
} from "./constants";
import { ObjectValuesUnionType } from "@/utils/applicationTypes";

export type IrysPaymentToken = ObjectValuesUnionType<
  typeof IRYS_PAYMENT_TOKEN_NAMES
>;

export type IrysProvider = ObjectValuesUnionType<typeof IRYS_PROVIDER_TYPES>;

export type IrysNetworkId = ObjectValuesUnionType<typeof IRYS_NETWORKS>;

export type IrysNodeUrl = ObjectValuesUnionType<typeof IRYS_NODE_URLS>;

export interface IrysItem {
  id: string;
  address: string;
  timestamp: number;
}
