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
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-2 group bg-white border rounded-sm shadow-sm">
        <img
          className="group-hover:brightness-90"
          src={post.coverImageUrl}
          alt={post.title}
        />
        <div className="flex flex-col gap-2 col-span-1 md:col-span-2 p-2 md:p-4">
          <h2 className="text-2xl group-hover:underline line-clamp-2 font-[verdana]">
            {post.title}
          </h2>
          <p className="text-base font-[verdana] text-black/80">{post.authorName}</p>
          <p className="text-sm text-black/60 font-[monaco] font-light mt-auto">
            {getReadableDateFromUnixMs(post.datePublishedInMs)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
