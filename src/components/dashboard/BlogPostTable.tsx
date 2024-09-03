"use client";

import React from "react";
import Link from "next/link";
import { Clipboard } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useWalletClient } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import { getAllBlogPostsForAddress } from "@/lib/irys";
import { BlogPost } from "@/utils/applicationTypes";

const BlogPostTableRow: React.FC<BlogPost> = ({
  title,
  status,
  author,
  createdAt,
  resourceUrl,
}) => {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(resourceUrl);
      console.log("URL copied to clipboard");
    } catch (err) {
      console.error("Failed to copy URL: ", err);
    }
  };

  return (
    <TableRow>
      <TableCell className="font-medium max-w-24 truncate text-ellipsis overflow-hidden text-nowrap">
        {title}
      </TableCell>
      <TableCell>
        <Badge variant="default">{status}</Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell max-w-24 truncate text-ellipsis overflow-hidden text-nowrap">
        {author}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {createdAt.toDateString()}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Link
          href={resourceUrl}
          target="_blank"
          rel="noopener"
          className="underline"
        >
          {resourceUrl}
        </Link>
      </TableCell>
      <TableCell>
        <Tooltip>
          <TooltipTrigger>
            <button
              onClick={copyToClipboard}
              className="active:scale-90 transition duration-150 ease-out"
            >
              <Clipboard size={18} />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Copy URL</p>
          </TooltipContent>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

export const BlogPostTable: React.FC = () => {
  const { data: walletData, status: walletStatus } = useWalletClient();
  const walletAddress = walletData?.account.address;

  const { data: blogPosts, status: queryStatus } = useQuery({
    queryKey: ["blogPosts", walletAddress],
    queryFn: () => getAllBlogPostsForAddress(walletAddress!), // null/undefined case already covered by enabled bool
    enabled: !!walletAddress,
  });

  console.log("logging retrieved items", blogPosts);

  const isLoadingData = queryStatus === "pending";

  if (isLoadingData && !!walletAddress) {
    return <div>Loading...</div>;
  }

  if (!walletAddress) {
    return <div>Please connect your wallet to view blog posts.</div>;
  }

  if (queryStatus === "error") {
    return <div>Error loading blog posts. Please try again later.</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="hidden md:table-cell">Author(s)</TableHead>
          <TableHead className="hidden md:table-cell">Created at</TableHead>
          <TableHead className="hidden md:table-cell">Resource URL</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {blogPosts ? (
          blogPosts.map((post, index) => (
            <BlogPostTableRow key={index} {...post} />
          ))
        ) : (
          <p>Nothing to see yet.. Time to start writing!</p>
        )}
      </TableBody>
    </Table>
  );
};
