import PostCard from "@/components/postCard";
import { getLatestPosts } from "@/lib/irys";
import { getIsoDateFromUnixMs } from "@/utils/dateUtils";
import Link from "next/link";

export const revalidate = 60;

const Page = async () => {
  const posts = await getLatestPosts({ limit: 5 });

  return (
    <div className="py-24 md:px-10 w-full bg-[#fcfcfc]">
      <main className="flex h-full w-full flex-col">
        <div className="flex flex-col gap-10 md:gap-5 mx-auto max-w-[900px]">
          <Link href="/dashboard" className="underline">
            Go to Dashboard
          </Link>
          <h1 className="text-4xl font-[monaco] uppercase tracking-wider font-bold mb-5 text-center">
            Latest Posts
          </h1>
          {posts.map((post) => (
            <PostCard post={post} key={post.transactionId} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Page;
