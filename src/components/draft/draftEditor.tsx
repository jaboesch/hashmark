"use client";

import React, { useRef, useState } from "react";
import Editor from "../editor";
import { DEFAULT_STYLES } from "@/lib/tiptap/constants";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { LuEye } from "react-icons/lu";
import { prepareHtmlFile } from "@/utils/fileUtils";
import { BlogPostMetadata } from "@/utils/applicationTypes";

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
  // this will hold the initial rendered value of htmlContent
  const stableHtmlContent = useRef(htmlContent);
  const [isLoading, setIsLoading] = useState(false);

  const updateHtml = (html: string) => {
    // TODO could maybe save to local storage here?
    setHtmlContent(html);
  };

  const onPreview = async () => {
    try {
      if (!metadata) throw new Error("Incomplete metadata");
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
        <Button size="lg" onClick={onContinue} disabled={isLoading}>
          <Send className="h-3.5 w-3.5 mr-2" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Continue
          </span>
        </Button>
      </div>
      <Editor initialHtml={stableHtmlContent.current} updateHtml={updateHtml} />
    </div>
  );
};

export default DraftEditor;
