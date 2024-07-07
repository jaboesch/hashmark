"use client";

import { uploadImage } from "@/lib/irys";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import { UseWalletClientReturnType, useWalletClient } from "wagmi";

type Props = {};

const Page = (props: Props) => {
  const { data, status } = useWalletClient();

  const onUpload = async (imageSrc: string): Promise<void> => {
    if (data) {
      console.log("Uploading image");
      const blob = await fetch(imageSrc).then((r) => r.blob());
      console.log("Blob", blob);
      await uploadImage(blob, data, "test");
      console.log("Image uploaded");
    }
  };

  return (
    <div>
      <h1>Page</h1>
      <ConnectButton />;
      <button
        className="bg-black text-white rounded-2xl px-4 py-2 disabled:opacity-50"
        disabled={!data || status === "error"}
        onClick={() =>
          onUpload("https://www.jboesch.dev/images/languages/typescript.svg")
        }
      >
        Upload Image
      </button>
    </div>
  );
};

export default Page;
