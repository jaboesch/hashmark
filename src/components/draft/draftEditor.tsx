"use client";

import React, { useRef, useState } from "react";
import Editor from "../editor";
import { DEFAULT_STYLES } from "@/lib/tiptap/constants";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { LuEye } from "react-icons/lu";
import { useWalletClient } from "wagmi";
import {
  createHtmlFile,
  createHtmlString,
  createSeoMetadataString,
} from "@/utils/fileUtils";
import { BlogPostMetadata } from "@/utils/applicationTypes";
import { uploadHtmlFile } from "@/lib/irys";

type Props = {
  theme: string;
  metadata: BlogPostMetadata | null;
  htmlContent: string;
  setHtmlContent: React.Dispatch<React.SetStateAction<string>>;
  onContinue: () => void;
};

const DraftEditor = ({
  theme,
  metadata,
  htmlContent,
  setHtmlContent,
  onContinue,
}: Props) => {
  const { data: client } = useWalletClient();
  // this will hold the initial rendered value of htmlContent
  const stableHtmlContent = useRef(htmlContent);
  const [isLoading, setIsLoading] = useState(false);

  const updateHtml = (html: string) => {
    // TODO could maybe save to local storage here?
    setHtmlContent(html);
  };

  const prepareHtmlFile = async (html: string) => {
    if (!metadata) throw new Error("Incomplete metadata");
    const styledHtml = createHtmlString({
      body: html,
      styles: DEFAULT_STYLES,
      theme: theme,
      seoMetadataString: createSeoMetadataString(metadata),
    });
    const htmlFilepath = await createHtmlFile(styledHtml);
    return htmlFilepath;
  };

  const onPreview = async () => {
    try {
      setIsLoading(true);
      const htmlFilepath = await prepareHtmlFile(htmlContent);
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
      const filepath = await prepareHtmlFile(htmlContent);
      await uploadHtmlFile({ filepath, client, metadata });
      onContinue();
    } catch (error) {
      console.error("Error uploading file", error);
      alert("An error occurred while publishing your post. Please try again.");
      return;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <style>{theme}</style>
      <style>{DEFAULT_STYLES}</style>
      <div className="flex flex-row gap-2 justify-end w-full">
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
            Publish
          </span>
        </Button>
      </div>
      <Editor initialHtml={stableHtmlContent.current} updateHtml={updateHtml} />
    </div>
  );
};

export default DraftEditor;
