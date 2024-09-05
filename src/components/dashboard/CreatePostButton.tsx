"use client";

import { PlusCircle } from "lucide-react";
import { useWalletClient } from "wagmi";
import { Button } from "../ui/button";
import Link from "next/link";

const ROUTE_DRAFT_URL = "/draft";

export function CreatePostButton() {
  const { data: walletData } = useWalletClient();

  const isWalletConnected = !!walletData?.account.address;

  return (
    <Link href={ROUTE_DRAFT_URL} aria-disabled={!isWalletConnected}>
      <Button size="lg" className="gap-1" disabled={!isWalletConnected}>
        <PlusCircle className="h-3.5 w-3.5" />
        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
          Create New Post
        </span>
      </Button>
    </Link>
  );
}
