import { IS_DEV } from "@/utils/applicationConstants";
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

export const APPLICATION_ID_DEV = "hashmark-dev";
export const APPLICATION_ID_PROD =
  "2c85f6b45bb02589ccfe7524c1236ba7b2715b9a98465010a5c31e5233cdd127";
export const APPLICATION_ID = IS_DEV ? APPLICATION_ID_DEV : APPLICATION_ID_PROD;

export enum IRYS_TAGS {
  CONTENT_TYPE = "Content-Type",
  APPLICATION_ID = "application-id",
  TITLE = "title",
  DESCRIPTION = "description",
  KEYWORDS = "keywords",
  COVER_IMAGE_URL = "cover-image-url",
  AUTHOR_NAME = "author-name",
  SLUG = "slug",
  CANONICAL_URL_PREFIX = "canonical-url-prefix",
  PUBLICATION = "publication",
}
