import { Account } from "viem";
import { UseWalletClientReturnType } from "wagmi";
import { WebIrys } from "@irys/sdk";
import pica from "pica";
import Query from "@irys/query";

const nodeUrl = "https://node2.irys.xyz";
// const nodeUrl = "https://devnet.irys.xyz";

export const getWebIrys = async (client: UseWalletClientReturnType) => {
  const rpcURL = "https://polygon-mumbai.g.alchemy.com/v2/demo";
  const token = "matic";
  console.log("sendTransaction=", client.data?.sendTransaction);
  const provider = client.data;
  if (!provider) throw new Error(`Cannot find wallet`);

  const irysWallet = {
    name: "viemv2",
    provider,
  };

  const webIrys = new WebIrys({
    url: nodeUrl,
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
  w: UseWalletClientReturnType,
  category?: string
) => {
  try {
    // Initialize WebIrys
    const webIrys = await getWebIrys(w);

    // Resize image to be less than 100 Kib
    const resizedBlob = await resizeImage(originalBlob);

    // Convert Blob to File
    const imageFile = new File([resizedBlob], "photo.jpg", {
      type: "image/jpeg",
    });
    console.log("Image file size: ", imageFile.size);

    // If imageFile.size < 100 Kib, it's free to upload, don't even check funding
    // Adding this check as a code example, but in our case we know our image is less than 100 Kib
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
      { name: "application-id", value: "1234" },
    ];
    if (category) {
      tags.push({ name: "category", value: category });
    }
    //@ts-ignore
    const receipt = await webIrys.uploadFile(imageFile, { tags });
    console.log("🚀 ~ receipt:", receipt);
    console.log(`Data uploaded ==> https://gateway.irys.xyz/${receipt.id}`);
  } catch (e) {
    console.error("Error uploading data", e);
  }
};

interface Item {
  id: string;
  address: string;
  timestamp: number;
}

export const fetchImages = async ({
  category,
}: {
  category: string | null;
}): Promise<Item[]> => {
  const myQuery = new Query({ url: `${nodeUrl}/graphql` });
  const TAGS_TO_FILTER = [
    { name: "application-id", values: [process.env.NEXT_PUBLIC_APP_ID] },
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
      //@ts-ignore
      .tags(TAGS_TO_FILTER)
      .sort("DESC");

    // Check if results exist and cast to array of Item objects
    return results ? (results as Item[]) : [];
  } catch (error) {
    console.error("Failed to fetch images:", error);
    return []; // Return an empty array in case of error
  }
};
