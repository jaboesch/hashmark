import React, {
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import EditorCommandButton from "./editorCommandButton";
import { SuggestionKeyDownProps, SuggestionProps } from "@tiptap/suggestion";
import { CommandItem } from "@/lib/tiptap/types";
import clsx from "clsx";

export const EditorCommandMenu = forwardRef(function EditorCommandMenu(
  props: SuggestionProps<CommandItem>,
  ref: Ref<any>
) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index: number) => {
    const item = props.items[index];

    if (item) {
      props.command(item);
    }
  };

  const upHandler = () => {
    setSelectedIndex(
      (selectedIndex + props.items.length - 1) % props.items.length
    );
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => setSelectedIndex(0), [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: SuggestionKeyDownProps) => {
      if (event.key === "ArrowUp") {
        upHandler();
        return true;
      }
      if (event.key === "ArrowDown") {
        downHandler();
        return true;
      }
      if (event.key === "Enter") {
        enterHandler();
        return true;
      }
      return false;
    },
  }));

  return (
    <div className="bg-white rounded-sm max-h-[400px] overflow-auto shadow-md flex min-w-[250px] flex-col gap-1 p-3 align-middle ">
      {props.items.length ? (
        props.items.map((item, index) => (
          <EditorCommandButton
            onClick={() => selectItem(index)}
            isActive={index === selectedIndex}
            onMouseEnter={() => setSelectedIndex(index)}
            label={item.title}
            key={`editor-command-button-${index}`}
          >
            <item.icon
              className={clsx(
                "size-8 mr-2 border rounded-md p-1 animate transition",
                index === selectedIndex && "border-[#ccc]"
              )}
            />
          </EditorCommandButton>
        ))
      ) : (
        <div className="item">No result</div>
      )}
    </div>
  );
});
