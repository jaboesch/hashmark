"use client";

import DraftDetailsForm from "@/components/draft/draftDetailsForm";
import DraftEditor from "@/components/draft/draftEditor";
import DraftPublishConfirmation from "@/components/draft/draftPublishConfirmation";
import { PublishDraftButton } from "@/components/draft/PublishDraft";
import Editor from "@/components/editor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SAMPLE_CONTENT } from "@/lib/tiptap/constants";
import { BlogPostMetadata } from "@/utils/applicationTypes";
import React, { useState } from "react";

type Props = {};

export enum DraftStage {
  DETAILS = "Details",
  EDITOR = "Editor",
  CONFIRMATION = "Confirmation",
}

const Page = (props: Props) => {
  const defaultHtmlContent = SAMPLE_CONTENT;
  const [stage, setStage] = useState<string>(DraftStage.DETAILS);
  const [metadata, setMetadata] = useState<BlogPostMetadata | null>(null);
  const [htmlContent, setHtmlContent] = useState<string | null>(null);

  return (
    <div className="w-full">
      <div className="flex mx-auto flex-col justify-center w-full gap-5 max-w-[800px]">
        <Tabs value={stage} onValueChange={(value) => setStage(value)}>
          <TabsList className="gap-5 w-full mb-2 md:mb-5">
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
          <TabsContent value={DraftStage.DETAILS}>
            <DraftDetailsForm
              metadata={metadata}
              setMetadata={setMetadata}
              onContinue={() => setStage(DraftStage.EDITOR)}
            />
          </TabsContent>
          <TabsContent value={DraftStage.EDITOR}>
            <pre>
              {JSON.stringify(metadata, null, 2)}
            </pre>
            {/* <DraftEditor
              defaultHtmlContent={defaultHtmlContent}
              setHtmlContent={setHtmlContent}
              onContinue={() => setStage(DraftStage.CONFIRMATION)}
            /> */}
          </TabsContent>
          <TabsContent value={DraftStage.CONFIRMATION}>
            <DraftPublishConfirmation />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;
