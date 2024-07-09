"use client";

import { uploadFile, uploadImage } from "@/lib/irys";
import { BlogPostHtmlAtom } from "@/lib/jotai/atoms";
import { createHtmlFile, getBlobFromImageUrl } from "@/utils/fileUtils";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAtom } from "jotai";
import React from "react";
import { UseWalletClientReturnType, useWalletClient } from "wagmi";

type Props = {};

const Page = (props: Props) => {
  const { data, status } = useWalletClient();
  const [html] = useAtom(BlogPostHtmlAtom);

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
    const htmlFilepath = await createHtmlFile(html);
    console.log("logging filepath", htmlFilepath);
    await uploadFile(htmlFilepath, data, "test");
    console.log("File uploaded");
  };

  return (
    <div>
      <h1>Page</h1>
      <button
        className="bg-black text-white rounded-2xl px-4 py-2 disabled:opacity-50"
        disabled={!data || status === "error"}
        onClick={() => onUpload(html)}
      >
        Upload HTML
      </button>
    </div>
  );
};

export default Page;
