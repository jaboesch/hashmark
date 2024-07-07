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

const resizeImage = async (
  originalBlob: Blob,
  targetSizeKb = 100
): Promise<Blob> => {
  const MAX_SIZE = targetSizeKb * 1024; // Convert KiB to bytes

  // Create an image to read the dimensions of the original blob
  const image = new Image();
  const originalUrl = URL.createObjectURL(originalBlob);
  image.src = originalUrl;
  await new Promise((resolve) => {
    image.onload = () => {
      URL.revokeObjectURL(originalUrl);
      resolve(null);
    };
  });

  // Calculate new size while maintaining aspect ratio
  const scaleFactor = Math.sqrt(MAX_SIZE / originalBlob.size);
  const newWidth = image.width * scaleFactor;
  const newHeight = image.height * scaleFactor;

  // Create a canvas and use pica to resize the image
  const canvas = document.createElement("canvas");
  canvas.width = newWidth;
  canvas.height = newHeight;

  await pica().resize(image, canvas);

  // Convert the resized image on the canvas to a blob
  let resizedBlob = await pica().toBlob(canvas, "image/jpeg", 0.9); // Start with high quality

  // Adjust quality if necessary
  let quality = 0.9;
  while (resizedBlob.size > MAX_SIZE && quality > 0.1) {
    quality -= 0.05; // Decrease quality incrementally
    resizedBlob = await pica().toBlob(canvas, "image/jpeg", quality);
  }

  return resizedBlob;
};

export const uploadImage = async (
  originalBlob: Blob,
  client: ViemClient,
  category?: string
) => {
  try {
    // Initialize WebIrys
    const webIrys = await getWebIrysInstance({ client });

    // Resize image to be less than 100 Kib
    const resizedBlob = await resizeImage(originalBlob);

    // Convert Blob to File
    const imageFile = new File([resizedBlob], "photo.jpg", {
      type: "image/jpeg",
    });
    console.log("Image file size: ", imageFile.size);

    // If imageFile.size < 100 Kib, it's free to upload, don't even check funding
    if (imageFile.size >= 102400) {
      // Fund
      const loadedBalance = webIrys.utils.fromAtomic(
        await webIrys.getLoadedBalance()
      );
      const costToUpload = await webIrys.getPrice(imageFile.size);
      console.log("Loaded balance=", loadedBalance.toString());
      if (costToUpload.isGreaterThanOrEqualTo(loadedBalance)) {
        try {
          console.log("Funding node costToUpload=", costToUpload);
          const fundTx = await webIrys.fund(costToUpload);
          console.log("Funding successful ", fundTx);
        } catch (e) {
          console.log("Error funding e=", e);
        }
      } else {
        console.log("Balance sufficient !(Funding node)");
      }
    }
    const tags = [
      { name: "Content-Type", value: "image/jpeg" },
      { name: "application-id", value: PLACEHOLDER_APPLICATION_ID },
    ];
    if (category) {
      tags.push({ name: "category", value: category });
    }

    const receipt = await webIrys.uploadFile(imageFile, { tags });
    console.log("Logging receipt", receipt);
    console.log(`Data uploaded ==> ${IRYS_GATEWAY_DOWNLOAD_URL(receipt.id)}`);
  } catch (e) {
    console.error("Error uploading data", e);
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
