import Editor from "@/components/editor";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="flex flex-col justify-center w-full">
      <Editor />
    </div>
  );
};

export default Page;
