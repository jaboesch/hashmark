import { IrysNetworkId, IrysNodeUrl } from "./types";

export const IRYS_PAYMENT_TOKEN_NAMES = {
  ETHEREUM: "ethereum",
  POLYGON: "matic",
  ARBITRUM: "arbitrum",
  BINANCE_SMART_CHAIN: "bnb",
  AVALANCHE: "avalanche",
  BOBA_ETH: "boba-eth",
  BOBA: "boba",
  SOLANA: "solana",
  NEAR: "near",
  APTOS: "aptos",
  ARWEAVE: "arweave",
  BASE_ETH: "base-eth",
  USDC_ETH: "usdc-eth",
  USDC_POLYGON: "usdc-polygon",
  BERA: "bera",
  SCROLL_ETH: "scroll-eth",
  LINEA_ETH: "linea-eth",
  IOTEX: "iotex",
} as const;

export const IRYS_PROVIDER_TYPES = {
  ETHERS_V5: "ethersv5",
  ETHERS_V6: "ethersv6",
  PRIVY_EMBEDDED: "privy-embedded",
  VIEM_V2: "viemv2",
} as const;

export const IRYS_NETWORKS = {
  MAINNET: "mainnet",
  DEVNET: "devnet",
} as const;

export const IRYS_NODE_URLS = {
  NODE_1: "https://node1.irys.xyz",
  NODE_2: "https://node2.irys.xyz",
  DEVNET: "https://devnet.irys.xyz",
} as const;

export const IRYS_DEFAULT_NODE_URL: IrysNodeUrl = IRYS_NODE_URLS.NODE_2;

export const IRYS_GATEWAY_BASE_URL = "https://gateway.irys.xyz";

export const IRYS_GRAPHQL_URL = (ArweaveNetwork: IrysNetworkId) =>
  `https://arweave.${ArweaveNetwork}.irys.xyz/graphql`;

export const IRYS_GATEWAY_ASSET_URL = ({
  manifestId,
  fileName,
}: {
  manifestId: string;
  fileName: string;
}) => `${IRYS_GATEWAY_BASE_URL}/${manifestId}/${fileName}`;

export const IRYS_GATEWAY_DOWNLOAD_URL = (transactionId: string) =>
  `${IRYS_GATEWAY_BASE_URL}/${transactionId}`;

//TODO: This is here as a random placeholder, need to replace with actual app id
export const PLACEHOLDER_APPLICATION_ID = "1234";
