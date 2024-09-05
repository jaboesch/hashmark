"use client";

import DraftDetailsForm from "@/components/draft/draftDetailsForm";
import DraftEditor from "@/components/draft/draftEditor";
import DraftPublishConfirmation from "@/components/draft/draftPublishConfirmation";
import { PublishDraftButton } from "@/components/draft/PublishDraft";
import Editor from "@/components/editor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DEFAULT_THEME, SAMPLE_CONTENT } from "@/lib/tiptap/constants";
import { BlogPostMetadata } from "@/utils/applicationTypes";
import React, { useState } from "react";

type Props = {};

export enum DraftStage {
  DETAILS = "Details",
  EDITOR = "Editor",
  CONFIRMATION = "Confirmation",
}

const Page = (props: Props) => {
  const [stage, setStage] = useState<string>(DraftStage.DETAILS);
  const [metadata, setMetadata] = useState<BlogPostMetadata | null>(null);
  const [htmlContent, setHtmlContent] = useState<string>(SAMPLE_CONTENT);

  return (
    <div className="w-full">
      <div className="flex mx-auto flex-col justify-center w-full gap-5 max-w-[800px]">
        <Tabs value={stage} onValueChange={(value) => setStage(value)}>
          <TabsList className="gap-2 h-10 absolute">
            <TabsTrigger value={DraftStage.DETAILS}>Details</TabsTrigger>
            <TabsTrigger value={DraftStage.EDITOR} disabled={!metadata}>
              Editor
            </TabsTrigger>
            <TabsTrigger
              value={DraftStage.CONFIRMATION}
              disabled={!metadata || !htmlContent}
            >
              Confirmation
            </TabsTrigger>
          </TabsList>
          <TabsContent value={DraftStage.DETAILS} className="animate-fade-in">
            <DraftDetailsForm
              metadata={metadata}
              setMetadata={setMetadata}
              onContinue={() => setStage(DraftStage.EDITOR)}
            />
          </TabsContent>
          <TabsContent value={DraftStage.EDITOR} className="animate-fade-in">
            <DraftEditor
              theme={DEFAULT_THEME}
              metadata={metadata}
              htmlContent={htmlContent}
              setHtmlContent={setHtmlContent}
              onContinue={() => setStage(DraftStage.CONFIRMATION)}
            />
          </TabsContent>
          <TabsContent value={DraftStage.CONFIRMATION} className="animate-fade-in">
            <DraftPublishConfirmation />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;
