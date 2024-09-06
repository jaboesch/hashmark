"use client";

import React from "react";
import Link from "next/link";
import { Clipboard, Wallet2 } from "lucide-react";

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
import { BlogPost, isPublished } from "@/utils/applicationTypes";

const BlogPostTableRow: React.FC<BlogPost> = (post) => {
  const postIsPublished = isPublished(post);
  const copyToClipboard = async () => {
    if (!postIsPublished) {
      alert("Cannot copy URL for unpublished post");
      return;
    }
    try {
      await navigator.clipboard.writeText(post.resourceUrl);
      console.log("URL copied to clipboard");
    } catch (err) {
      console.error("Failed to copy URL: ", err);
    }
  };

  return (
    <TableRow>
      <TableCell className="font-medium max-w-24 truncate text-ellipsis overflow-hidden text-nowrap">
        {post.title}
      </TableCell>
      <TableCell>
        <Badge variant="default">
          {postIsPublished ? "Published" : "Draft"}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell max-w-24 truncate text-ellipsis overflow-hidden text-nowrap">
        {post.authorName}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {postIsPublished
          ? new Date(post.datePublishedInMs).toLocaleString()
          : "-"}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {postIsPublished ? (
          <Link
            href={post.resourceUrl}
            target="_blank"
            rel="noopener"
            className="underline"
          >
            {post.resourceUrl}
          </Link>
        ) : (
          <p className="text-gray-400">N/A</p>
        )}
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
    return (
      <div className="mx-auto w-full text-center flex justify-center items-center space-x-2">
        <Wallet2 />
        <p>Please connect your wallet above to get started!</p>
      </div>
    );
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
