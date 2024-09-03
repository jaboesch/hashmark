import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BlogPostTable } from "@/components/dashboard/BlogPostTable";

export function BlogPostCard() {
  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>Blog Posts</CardTitle>
        <CardDescription>
          Manage your drafts and see previously published posts.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <BlogPostTable />
      </CardContent>
    </Card>
  );
}
