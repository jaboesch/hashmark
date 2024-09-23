import React, { useState } from "react";
import { Button } from "../ui/button";
import { useWalletClient } from "wagmi";
import { prepareHtmlFile } from "@/utils/fileUtils";
import { BlogPostMetadata } from "@/utils/applicationTypes";
import { uploadHtmlFile } from "@/lib/irys";
import { LuEye } from "react-icons/lu";
import { ArrowLeft, Send } from "lucide-react";
import Link from "next/link";
import { IRYS_GATEWAY_DOWNLOAD_URL } from "@/lib/irys/constants";
import { useRouter } from "next/navigation";
import clsx from "clsx";

type Props = {
  htmlContent: string;
  theme: string;
  metadata: BlogPostMetadata | null;
  postId: string | null;
  setPostId: (postId: string) => void;
};

const DraftPublishConfirmation = ({
  htmlContent,
  metadata,
  theme,
  postId,
  setPostId,
}: Props) => {
  const { replace } = useRouter();
  const { data: client } = useWalletClient();
  const [isLoading, setIsLoading] = useState(false);

  const onPreview = async () => {
    if (!metadata) {
      console.error("Incomplete metadata");
      alert("Incomplete metadata. Please fill in all fields.");
      return;
    }
    try {
      setIsLoading(true);
      const htmlFilepath = await prepareHtmlFile({
        htmlContent,
        theme,
        metadata,
      });
      window.open(htmlFilepath, "_blank");
    } catch (error) {
      console.error("Error opening preview", error);
      alert("An error occurred while opening the preview. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const onPublish = async () => {
    if (!client) {
      console.error("No wallet connection");
      alert("Please connect your wallet to publish your post.");
      return;
    }
    if (!metadata) {
      console.error("Incomplete metadata");
      alert("Incomplete metadata. Please fill in all fields.");
      return;
    }
    try {
      setIsLoading(true);
      const filepath = await prepareHtmlFile({
        htmlContent,
        theme,
        metadata,
      });
      const res = await uploadHtmlFile({ filepath, client, metadata });
      // add 2 second artificial delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setPostId(res.id);
    } catch (error) {
      console.error("Error uploading file", error);
      alert("An error occurred while publishing your post. Please try again.");
      return;
    } finally {
      setIsLoading(false);
    }
  };

  if (!metadata) {
    return (
      <div className="w-full mt-[75px]">
        <div className="flex flex-col w-full p-5 gap-5 bg-white shadow-sm rounded-sm">
          <p>Fill in all details to publish your post.</p>
        </div>
      </div>
    );
  }

  const hashmarkUrl = `https://www.hashmark.xyz/post/${client?.account.address}/${metadata.slug}`;
  const arweaveUrl = IRYS_GATEWAY_DOWNLOAD_URL(postId ?? "");

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex flex-row gap-2 justify-end w-full">
        {!postId && (
          <>
            <Button
              size="lg"
              variant="outline"
              onClick={onPreview}
              disabled={isLoading}
            >
              <LuEye className="h-3.5 w-3.5 mr-2" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Preview
              </span>
            </Button>
            <Button size="lg" onClick={onPublish} disabled={isLoading}>
              <Send className="h-3.5 w-3.5 mr-2" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                {isLoading ? "Publishing..." : "Publish"}
              </span>
            </Button>
          </>
        )}
        {!!postId && (
          <Button size="lg" onClick={() => replace("/dashboard")}>
            <ArrowLeft className="h-3.5 w-3.5 mr-2" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Return to Dashboard
            </span>
          </Button>
        )}
      </div>
      {postId && (
        <div className="flex flex-col w-full p-5 gap-2 bg-white shadow-sm rounded-sm">
          <h2 className="text-xl font-semibold">Post Published Successfully</h2>
          <h3 className="font-semibold mt-2">View on Hashmark</h3>
          <Link
            className="hover:underline text-blue-500 truncate"
            href={hashmarkUrl}
            target="_blank"
            rel="noreferrer"
          >
            {hashmarkUrl}
          </Link>
          <h3 className="font-semibold mt-2">View on Arweave</h3>
          <Link
            className="hover:underline text-blue-500 truncate"
            href={arweaveUrl}
            target="_blank"
            rel="noreferrer"
          >
            {arweaveUrl}
          </Link>
        </div>
      )}
      <div
        className={clsx(
          "flex flex-col w-full p-5 gap-2 bg-white shadow-sm rounded-sm",
          isLoading && "!bg-white/95 animate-pulse"
        )}
      >
        <h2 className="text-xl font-semibold">
          {postId ? "Post Details" : "Publish Confirmation"}
        </h2>
        <h3 className="font-semibold mt-2">Title</h3>
        <p>{metadata.title}</p>
        <h3 className="font-semibold mt-2">Description</h3>
        <p>{metadata.description}</p>
        <h3 className="font-semibold mt-2">Author Name</h3>
        <p>{metadata.authorName}</p>
        <h3 className="font-semibold mt-2">Canonical URL</h3>
        <p>{`${metadata.canonicalUrlPrefix}${metadata.slug}`}</p>
        <h3 className="font-semibold mt-2">Publication</h3>
        <p>{metadata.publication}</p>
        <h3 className="font-semibold mt-2">Cover Image</h3>
        <img src={metadata.coverImageUrl} alt="Cover Image" />
      </div>
    </div>
  );
};

export default DraftPublishConfirmation;
