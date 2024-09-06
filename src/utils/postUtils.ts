import { BlogPostPublished } from "./applicationTypes";

export const createPostHref = (post: BlogPostPublished) => {
  return `/post/${post.authorAddress}/${post.slug}`;
};
