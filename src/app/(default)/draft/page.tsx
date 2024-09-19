"use client";

import { processHtml } from "@/app/actions/processHtml";
import DraftDetailsForm from "@/components/draft/draftDetailsForm";
import DraftEditor from "@/components/draft/draftEditor";
import DraftPublishConfirmation from "@/components/draft/draftPublishConfirmation";
import ThemeForm from "@/components/draft/draftThemeForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getBlogPostById } from "@/lib/irys";
import { DEFAULT_THEME, SAMPLE_CONTENT } from "@/lib/tiptap/constants";
import { BlogPostMetadata } from "@/utils/applicationTypes";
import React, { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";

type Props = {
  searchParams?: {
    templateId?: string;
  };
};

const Page = ({ searchParams }: Props) => {
  enum DraftStage {
    DETAILS = "Details",
    THEME = "Theme",
    EDITOR = "Editor",
    CONFIRMATION = "Confirmation",
  }

  const { address } = useAccount();
  const [stage, setStage] = useState<string>(DraftStage.DETAILS);
  const [metadata, setMetadata] = useState<BlogPostMetadata | null>(null);
  const [theme, setTheme] = useState<string>(DEFAULT_THEME);
  const [htmlContent, setHtmlContent] = useState<string>(SAMPLE_CONTENT);
  const [isTemplateLoading, setIsTemplateLoading] = useState<boolean>(false);

  const fetchTemplate = useCallback(async () => {
    if (searchParams?.templateId) {
      try {
        setIsTemplateLoading(true);
        const post = await getBlogPostById({
          transactionId: searchParams.templateId,
        });
        if (!post) throw new Error("Post not found");
        const postHtml = await processHtml(post.resourceUrl);
        if (!postHtml) throw new Error("Post not found");
        setMetadata({
          title: post.title,
          description: post.description,
          keywords: post.keywords,
          coverImageUrl: post.coverImageUrl,
          authorName: post.authorName,
          canonicalUrlPrefix: post.canonicalUrlPrefix,
          publication: post.publication,
          slug: post.slug,
        });
        setHtmlContent(postHtml.content);
        setTheme(postHtml.theme);
      } catch (error) {
        alert("Error duplicating template");
        console.error("Error duplicating template", error);
      } finally {
        setIsTemplateLoading(false);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (fetchTemplate) fetchTemplate();
  }, [fetchTemplate]);

  if (!address) {
    return <div>Connect your wallet to create a draft.</div>;
  }

  if (isTemplateLoading) {
    return <div>Loading template...</div>;
  }

  return (
    <div className="w-full">
      <div className="flex mx-auto flex-col justify-center w-full gap-5 max-w-[800px]">
        <Tabs value={stage} onValueChange={(value) => setStage(value)}>
          <TabsList className="gap-2 h-10 absolute">
            <TabsTrigger value={DraftStage.DETAILS}>Details</TabsTrigger>
            <TabsTrigger value={DraftStage.THEME}>Theme</TabsTrigger>
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
              address={address}
              metadata={metadata}
              setMetadata={setMetadata}
              onContinue={() => setStage(DraftStage.THEME)}
            />
          </TabsContent>
          <TabsContent value={DraftStage.THEME} className="animate-fade-in">
            <ThemeForm
              theme={theme}
              onSubmit={(theme: string) => {
                setTheme(theme);
                setStage(DraftStage.EDITOR);
              }}
            />
          </TabsContent>
          <TabsContent value={DraftStage.EDITOR} className="animate-fade-in">
            <DraftEditor
              theme={theme}
              metadata={metadata}
              htmlContent={htmlContent}
              setHtmlContent={setHtmlContent}
              onContinue={() => setStage(DraftStage.CONFIRMATION)}
            />
          </TabsContent>
          <TabsContent
            value={DraftStage.CONFIRMATION}
            className="animate-fade-in"
          >
            <DraftPublishConfirmation />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;
