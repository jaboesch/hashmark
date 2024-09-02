"use client";

import { getAllBlogPosts, uploadFile, uploadImage } from "@/lib/irys";
import { BlogPostHtmlAtom } from "@/lib/jotai/atoms";
import { DEFAULT_STYLES } from "@/lib/tiptap/constants";
import {
  createHtmlFile,
  createHtmlString,
  getBlobFromImageUrl,
} from "@/utils/fileUtils";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAtom } from "jotai";
import React from "react";
import { useWalletClient } from "wagmi";

type Props = {};

const Page = (props: Props) => {
  const { data, status } = useWalletClient();
  const [html] = useAtom(BlogPostHtmlAtom);

  const manualFetch = async (walletAddress?: string) => {
    if (!walletAddress) return;
    const res = await getAllBlogPosts(walletAddress);
    console.log("logging res", res);
  };

  const onUpload = async (html: string | null): Promise<void> => {
    if (!html) {
      console.error("No HTML to upload");
      return;
    }

    if (!data) {
      console.error("No wallet connection");
      return;
    }

    console.log("logging file to upload", html);
    const styledHtml = createHtmlString({ body: html, styles: DEFAULT_STYLES });
    const htmlFilepath = await createHtmlFile(styledHtml);
    console.log("logging filepath", htmlFilepath);
    await uploadFile(htmlFilepath, data, "test");
    console.log("File uploaded");
  };

  return (
    <div className="h-screen w-screen bg-red-500">
      <h1>Page</h1>
      <button
        className="bg-black text-white rounded-2xl px-4 py-2 disabled:opacity-50"
        disabled={!data || status === "error"}
        onClick={() => onUpload(html)}
      >
        Upload HTML
      </button>
      <button
        className="bg-black text-white rounded-2xl px-4 py-2 disabled:opacity-50"
        disabled={!data || status === "error"}
        onClick={() => manualFetch(data?.account.address)}
      >
        Run Query
      </button>
    </div>
  );
};

export default Page;
