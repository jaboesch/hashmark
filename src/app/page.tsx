import PostCard from "@/components/postCard";
import { getLatestPosts } from "@/lib/irys";
import { getIsoDateFromUnixMs } from "@/utils/dateUtils";
import Link from "next/link";

export const revalidate = 60;

const Page = async () => {
  const posts = await getLatestPosts({ limit: 5 });

  return (
    <div className="py-24 md:px-10 w-full bg-gray-100">
      <main className="flex h-full w-full flex-col ">
        <div className="flex flex-col gap-5 mx-auto max-w-[800px]">
          <Link href="/draft" className="underline">
            Go to Dashboard
          </Link>
          <h1 className="text-4xl font-bold">Latest Posts</h1>
          {posts.map((post) => (
            <PostCard post={post} key={post.transactionId} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Page;
