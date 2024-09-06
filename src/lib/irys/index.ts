import { WebIrys } from "@irys/sdk";
import Query from "@irys/query";
import { IrysBlogPostQueryResponse, IrysItem, IrysPaymentToken } from "./types";
import {
  IRYS_DEFAULT_NODE_URL,
  IRYS_GATEWAY_DOWNLOAD_URL,
  IRYS_GRAPHQL_URL,
  IRYS_NETWORKS,
  IRYS_PAYMENT_TOKEN_NAMES,
  IRYS_PROVIDER_TYPES,
  IRYS_TAGS,
  PLACEHOLDER_APPLICATION_ID,
} from "./constants";
import {
  BlogPost,
  BlogPostMetadata,
  BlogPostPublished,
  ViemClient,
} from "@/utils/applicationTypes";
import { resizeImage } from "@/utils/fileUtils";

const irysQuery = new Query({ url: IRYS_GRAPHQL_URL(IRYS_NETWORKS.MAINNET) });

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

const prepareBlogTags = ({ metadata }: { metadata: BlogPostMetadata }) => {
  const tags = [
    { name: IRYS_TAGS.CONTENT_TYPE, value: "text/html" },
    { name: IRYS_TAGS.APPLICATION_ID, value: PLACEHOLDER_APPLICATION_ID },
    { name: IRYS_TAGS.TITLE, value: metadata.title },
    { name: IRYS_TAGS.DESCRIPTION, value: metadata.description },
    { name: IRYS_TAGS.KEYWORDS, value: metadata.keywords },
    { name: IRYS_TAGS.COVER_IMAGE_URL, value: metadata.coverImageUrl },
    { name: IRYS_TAGS.AUTHOR_NAME, value: metadata.authorName },
    {
      name: IRYS_TAGS.CANONICAL_URL_PREFIX,
      value: metadata.canonicalUrlPrefix,
    },
    { name: IRYS_TAGS.PUBLICATION, value: metadata.publication },
    { name: IRYS_TAGS.SLUG, value: metadata.slug },
  ];
  return tags;
};

export const uploadImage = async (originalBlob: Blob, client: ViemClient) => {
  try {
    const webIrys = await getWebIrysInstance({ client });
    const resizedBlob = await resizeImage(originalBlob);
    const imageFile = new File([resizedBlob], "photo.jpg", {
      type: "image/jpeg",
    });
    console.log("Image file size: ", imageFile.size);

    await handleFunding(webIrys, imageFile.size);
    const receipt = await webIrys.uploadFile(imageFile, {
      tags: [
        { name: IRYS_TAGS.APPLICATION_ID, value: PLACEHOLDER_APPLICATION_ID },
        { name: IRYS_TAGS.CONTENT_TYPE, value: "image/jpeg" },
      ],
    });
    return receipt;
  } catch (e) {
    console.error("Error uploading data", e);
    throw e;
  }
};

export const uploadHtmlFile = async ({
  metadata,
  filepath,
  client,
}: {
  metadata: BlogPostMetadata;
  filepath: string;
  client: ViemClient;
}) => {
  try {
    const webIrys = await getWebIrysInstance({ client });
    const response = await fetch(filepath);
    const blob = await response.blob();

    const tags = prepareBlogTags({ metadata });
    const htmlFile = new File([blob], `${metadata.slug}.html`, {
      type: "text/html",
    });
    console.log("HTML file size: ", htmlFile.size);

    await handleFunding(webIrys, htmlFile.size);
    const receipt = await webIrys.uploadFile(htmlFile, { tags });
    return receipt;
  } catch (e) {
    console.error("Error uploading data", e);
    throw e;
  }
};

const processTags = (tags: { name: string; value: string }[]) => {
  const tagObject: Record<string, string> = {};
  tags.forEach((tag) => {
    tagObject[tag.name] = tag.value;
  });
  const processedTags: BlogPostMetadata = {
    title: tagObject[IRYS_TAGS.TITLE],
    description: tagObject[IRYS_TAGS.DESCRIPTION],
    keywords: tagObject[IRYS_TAGS.KEYWORDS],
    coverImageUrl: tagObject[IRYS_TAGS.COVER_IMAGE_URL],
    authorName: tagObject[IRYS_TAGS.AUTHOR_NAME],
    canonicalUrlPrefix: tagObject[IRYS_TAGS.CANONICAL_URL_PREFIX],
    publication: tagObject[IRYS_TAGS.PUBLICATION],
    slug: tagObject[IRYS_TAGS.SLUG],
  };
  return processedTags;
}

export const getAllBlogPostsForAddress = async (
  walletAddress: `0x${string}`
): Promise<BlogPost[]> => {
  const TAGS_TO_FILTER = [
    { name: IRYS_TAGS.APPLICATION_ID, values: [PLACEHOLDER_APPLICATION_ID] },
    { name: IRYS_TAGS.CONTENT_TYPE, values: ["text/html"] },
  ];

  try {
    const results = await irysQuery
      .search("irys:transactions")
      .tags(TAGS_TO_FILTER)
      .from([walletAddress])
      .sort("DESC");

    const rawData = results ? (results as IrysBlogPostQueryResponse[]) : [];

    const formattedPosts = rawData.map((post) => {
      const { address, id, timestamp, tags } = post;
      const resourceUrl = IRYS_GATEWAY_DOWNLOAD_URL(id);
      const processedTags = processTags(tags);
      
      const blogPost: BlogPostPublished = {
        authorAddress: address as `0x${string}`,
        datePublishedInMs: timestamp,
        resourceUrl,
        transactionId: id,
        ...processedTags,
      };
      return blogPost;
    });

    return formattedPosts;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return [];
  }
};
