import clsx from "clsx";
import React from "react";

type Props = {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
  isActive?: boolean;
  isDisabled?: boolean;
};

const EditorButton = ({
  children,
  onClick,
  isActive,
  isDisabled,
  label,
}: Props) => {
  return (
    <button
      className={clsx(
        "hover:bg-gray-200 size-8 p-1.5 rounded",
        isActive ? "text-blue-500" : "text-gray-500",
        isDisabled && "bg-gray-100 text-gray-300 pointer-events-none"
      )}
      onClick={onClick}
      disabled={isDisabled}
      title={label}
      type="button"
    >
      {children}
    </button>
  );
};

export default EditorButton;
