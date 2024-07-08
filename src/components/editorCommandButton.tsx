import clsx from "clsx";
import React from "react";

type Props = {
  children: React.ReactNode;
  onClick: () => void;
  onMouseEnter: () => void;
  label: string;
  isActive?: boolean;
  isDisabled?: boolean;
};

const EditorCommandButton = ({
  children,
  onClick,
  onMouseEnter,
  isActive,
  isDisabled,
  label,
}: Props) => {
  return (
    <button
      className={clsx(
        "px-1 py-2 rounded animate transition",
        isActive ? "bg-gray-200" : "text-gray-500",
        isDisabled && "bg-gray-100 text-gray-300 pointer-events-none"
      )}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      disabled={isDisabled}
      title={label}
      type="button"
    >
      <div className="flex flex-row gap-1 align-middle items-center">
        {children}
        {label}
      </div>
    </button>
  );
};

export default EditorCommandButton;
