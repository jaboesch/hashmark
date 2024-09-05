"use client";

import { getAllBlogPostsForAddress, uploadFile, uploadImage } from "@/lib/irys";
import { BlogPostHtmlAtom } from "@/lib/jotai/atoms";
import { DEFAULT_STYLES, DEFAULT_THEME } from "@/lib/tiptap/constants";
import {
  createHtmlFile,
  createHtmlString,
  getBlobFromImageUrl,
} from "@/utils/fileUtils";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAtom } from "jotai";
import { Send } from "lucide-react";
import React from "react";
import { useWalletClient } from "wagmi";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export function PublishDraftButton({ className }: { className?: string }) {
  const { data } = useWalletClient();
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
    const styledHtml = createHtmlString({
      body: html,
      styles: DEFAULT_STYLES,
      theme: DEFAULT_THEME,
      seoMetadataString: "",
    });
    const htmlFilepath = await createHtmlFile(styledHtml);
    console.log("logging filepath", htmlFilepath);
    await uploadFile(htmlFilepath, data, "test");
    alert("Success! Your post was published successfully.");
    console.log("File uploaded");
  };

  return (
    <Button
      size="sm"
      className={cn("h-8 gap-1 w-36", className)}
      disabled={!data?.account.address || !html}
      onClick={() => onUpload(html)}
    >
      <Send className="h-3.5 w-3.5" />
      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
        Publish Draft
      </span>
    </Button>
  );
}
