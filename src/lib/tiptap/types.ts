import { Editor, Range } from "@tiptap/react";
import { IconType } from "react-icons/lib";

export type CommandFtnProps = {
  editor: Editor;
  range: Range;
};

export type CommandItem = {
  title: string;
  icon: IconType;
  command: (props: CommandFtnProps) => void;
};
