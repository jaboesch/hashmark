import React from "react";
import { Button } from "../ui/button";

type Props = {};

const DraftPublishConfirmation = (props: Props) => {
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex flex-row gap-2 justify-end w-full">
        <Button
          size="lg"
          variant="outline"
        >
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Visit
          </span>
        </Button>
        <Button size="lg">
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Return
          </span>
        </Button>
      </div>
      <div className="flex flex-col w-full gap-5 bg-white shadow-sm rounded-sm">
        Confirmation things
      </div>
    </div>
  );
};

export default DraftPublishConfirmation;
