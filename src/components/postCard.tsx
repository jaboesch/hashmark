import React from "react";
import { BlogPostPublished } from "@/utils/applicationTypes";
import { getReadableDateFromUnixMs } from "@/utils/dateUtils";
import Link from "next/link";
import { createPostHref } from "@/utils/postUtils";

type Props = {
  post: BlogPostPublished;
};

const PostCard = ({ post }: Props) => {
  return (
    <Link href={createPostHref(post)}>
      <div className="w-full grid grid-cols-3 gap-2 group bg-white rounded-sm shadow-sm">
        <img
          className="group-hover:brightness-90"
          src={post.coverImageUrl}
          alt={post.title}
        />
        <div className="flex flex-col gap-2 col-span-2">
          <p className="text-base">{post.authorName}</p>
          <h2 className="text-2xl font-semibold group-hover:underline">
            {post.title}
          </h2>
          <p className="text-base">
            {getReadableDateFromUnixMs(post.datePublishedInMs)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
