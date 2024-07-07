import React from "react";
import { Nav } from "./nav";

type Props = {
  children: React.ReactNode;
};

const RootContainer = ({ children }: Props) => {
  return <div className="px-4">{children}</div>;
};

export default RootContainer;
