import { PublishDraftButton } from "@/components/draft/PublishDraft";
import Editor from "@/components/editor";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="flex flex-col justify-center w-full">
      <PublishDraftButton className="self-end mb-5" />
      <Editor />
    </div>
  );
};

export default Page;
