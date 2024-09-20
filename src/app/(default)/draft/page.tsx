import DraftManager from "@/components/draft/draftManager";
import { Suspense } from "react";

type Props = {
  searchParams?: {
    templateId?: string;
  };
};

const Page = ({ searchParams }: Props) => {
  return (
    <div className="w-full">
      <Suspense>
        <DraftManager templateId={searchParams?.templateId} />
      </Suspense>
    </div>
  );
};

export default Page;
