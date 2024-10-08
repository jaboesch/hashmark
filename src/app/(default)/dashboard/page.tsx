import { Tabs, TabsContent } from "@/components/ui/tabs";
import { BlogPostCard } from "@/components/dashboard/BlogPostCard";
import { Header } from "@/components/dashboard/Header";

const Page = () => {
  return (
    <div className="flex h-full w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <Header />
            <TabsContent value="all">
              <BlogPostCard />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Page;
