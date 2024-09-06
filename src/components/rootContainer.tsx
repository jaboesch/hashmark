import React from "react";

type Props = {
  children: React.ReactNode;
};

const RootContainer = ({ children }: Props) => {
  return <div className="py-24 md:px-10 w-full bg-gray-100">{children}</div>;
};

export default RootContainer;
