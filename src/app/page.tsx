import { Tabs, TabsContent } from "@/components/ui/tabs";
import { BlogPostCard } from "@/components/dashboard/BlogPostCard";
import { Header } from "@/components/dashboard/Header";

export default function Home() {
  return (
    <div className="py-24 md:px-10 w-full bg-gray-100">
      <div className="flex h-full w-full flex-col ">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            Welcome to Hashmark
          </main>
        </div>
      </div>
    </div>
  );
}
