import { atomWithStorage, createJSONStorage } from "jotai/utils";

const storage = createJSONStorage<string | null>(() => sessionStorage);
export const BlogPostHtmlAtom = atomWithStorage<string | null>(
  "blogPost",
  null,
  storage
);
