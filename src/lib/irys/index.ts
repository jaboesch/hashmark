import { WebIrys } from "@irys/sdk";
import pica from "pica";
import Query from "@irys/query";
import { IrysItem, IrysPaymentToken } from "./types";
import {
  IRYS_DEFAULT_NODE_URL,
  IRYS_GATEWAY_DOWNLOAD_URL,
  IRYS_GRAPHQL_URL,
  IRYS_NETWORKS,
  IRYS_PAYMENT_TOKEN_NAMES,
  IRYS_PROVIDER_TYPES,
  PLACEHOLDER_APPLICATION_ID,
} from "./constants";
import { ViemClient } from "@/utils/applicationTypes";
import { resizeImage } from "@/utils/fileUtils";
import fs from "fs/promises";
import path from "path";

export const getWebIrysInstance = async ({
  client,
  paymentToken,
}: {
  client: ViemClient;
  paymentToken?: IrysPaymentToken;
}) => {
  const token: IrysPaymentToken =
    paymentToken ?? IRYS_PAYMENT_TOKEN_NAMES.BASE_ETH;

  const irysWallet = {
    name: IRYS_PROVIDER_TYPES.VIEM_V2,
    provider: client,
  };

  const webIrys = new WebIrys({
    url: IRYS_DEFAULT_NODE_URL,
    token: token,
    wallet: irysWallet,
  });

  await webIrys.ready();
  return webIrys;
};

async function handleFunding(webIrys: WebIrys, fileSize: number) {
  if (fileSize >= 102400) {
    const loadedBalance = webIrys.utils.fromAtomic(
      await webIrys.getLoadedBalance()
    );
    const costToUpload = await webIrys.getPrice(fileSize);
    console.log("Loaded balance:", loadedBalance.toString());
    if (costToUpload.isGreaterThanOrEqualTo(loadedBalance)) {
      try {
        console.log("Funding node costToUpload:", costToUpload);
        const fundTx = await webIrys.fund(costToUpload);
        console.log("Funding successful ", fundTx);
      } catch (e) {
        console.log("Error funding:", e);
      }
    } else {
      console.log("Balance sufficient !(Funding node)");
    }
  }
}

async function prepareAndUpload(
  webIrys: WebIrys,
  file: File,
  contentType: string,
  category?: string
) {
  const tags = [
    { name: "Content-Type", value: contentType },
    { name: "application-id", value: PLACEHOLDER_APPLICATION_ID },
  ];
  if (category) {
    tags.push({ name: "category", value: category });
  }

  const receipt = await webIrys.uploadFile(file, { tags });
  console.log("Logging receipt", receipt);
  console.log(`Data uploaded ==> ${IRYS_GATEWAY_DOWNLOAD_URL(receipt.id)}`);
  return receipt;
}

export const uploadImage = async (
  originalBlob: Blob,
  client: ViemClient,
  category?: string
) => {
  try {
    const webIrys = await getWebIrysInstance({ client });

    const resizedBlob = await resizeImage(originalBlob);

    const imageFile = new File([resizedBlob], "photo.jpg", {
      type: "image/jpeg",
    });
    console.log("Image file size: ", imageFile.size);

    await handleFunding(webIrys, imageFile.size);

    return await prepareAndUpload(webIrys, imageFile, "image/jpeg", category);
  } catch (e) {
    console.error("Error uploading data", e);
    throw e;
  }
};

export const uploadFile = async (
  filepath: string,
  client: ViemClient,
  category?: string
) => {
  try {
    const webIrys = await getWebIrysInstance({ client });

    const response = await fetch(filepath);
    const blob = await response.blob();

    const htmlFile = new File([blob], "document.html", {
      type: "text/html",
    });

    console.log("HTML file size: ", htmlFile.size);

    await handleFunding(webIrys, htmlFile.size);

    return await prepareAndUpload(webIrys, htmlFile, "text/html", category);
  } catch (e) {
    console.error("Error uploading data", e);
    throw e;
  }
};

export const getAllImages = async (): Promise<IrysItem[]> => {
  const myQuery = new Query({ url: IRYS_GRAPHQL_URL(IRYS_NETWORKS.MAINNET) });
  const TAGS_TO_FILTER = [
    { name: "application-id", values: [PLACEHOLDER_APPLICATION_ID] },
    { name: "Content-Type", values: ["image/jpeg"] },
  ];

  try {
    const results = await myQuery
      .search("irys:transactions")
      .fields({
        id: true,
        address: true,
        timestamp: true,
        tags: {
          name: true,
          value: true,
        },
      })
      .tags(TAGS_TO_FILTER)
      .sort("DESC");

    return results ? (results as IrysItem[]) : [];
  } catch (error) {
    console.error("Failed to fetch images:", error);
    return [];
  }
};
