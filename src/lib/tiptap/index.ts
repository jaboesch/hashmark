import { Extension } from "@tiptap/core";
import { Editor, Range } from "@tiptap/react";
import { Suggestion } from "@tiptap/suggestion";
import { ReactRenderer } from "@tiptap/react";
import tippy, { Instance as TippyInstance } from "tippy.js";
import {
  LuText,
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuList,
  LuListOrdered,
  LuTextQuote,
  LuCode2,
} from "react-icons/lu";
import { SuggestionKeyDownProps, SuggestionProps } from "@tiptap/suggestion";
import { RefAttributes } from "react";
import { CommandFtnProps, CommandItem } from "@/lib/tiptap/types";
import { EditorCommandMenu } from "@/components/editorCommandMenu";
import { MdHorizontalRule } from "react-icons/md";

export const SlashCommands = Extension.create({
  name: "slashCommands",

  addOptions() {
    return {
      suggestion: {
        char: "/",
        command: ({
          editor,
          range,
          props,
        }: {
          editor: Editor;
          range: Range;
          props: CommandItem;
        }) => {
          props.command({ editor, range });
        },
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});

const slashCommandItems: CommandItem[] = [
  {
    title: "Paragraph",
    icon: LuText,
    command: ({ editor, range }: CommandFtnProps) => {
      editor.chain().focus().deleteRange(range).setNode("paragraph").run();
    },
  },
  {
    title: "Heading 1",
    icon: LuHeading1,
    command: ({ editor, range }: CommandFtnProps) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 1 })
        .run();
    },
  },
  {
    title: "Heading 2",
    icon: LuHeading2,
    command: ({ editor, range }: CommandFtnProps) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 2 })
        .run();
    },
  },
  {
    title: "Heading 3",
    icon: LuHeading3,
    command: ({ editor, range }: CommandFtnProps) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 3 })
        .run();
    },
  },
  {
    title: "Bullet List",
    icon: LuList,
    command: ({ editor, range }: CommandFtnProps) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },
  {
    title: "Ordered List",
    icon: LuListOrdered,
    command: ({ editor, range }: CommandFtnProps) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
  },
  {
    title: "Code Block",
    icon: LuCode2,
    command: ({ editor, range }: CommandFtnProps) => {
      editor.chain().focus().deleteRange(range).setCodeBlock().run();
    },
  },
  {
    title: "Blockquote",
    icon: LuTextQuote,
    command: ({ editor, range }: CommandFtnProps) => {
      editor.chain().focus().deleteRange(range).setBlockquote().run();
    },
  },
  {
    title: "Divider",
    icon: MdHorizontalRule,
    command: ({ editor, range }: CommandFtnProps) => {
      editor.chain().focus().deleteRange(range).setHorizontalRule().run();
    },
  },
];

export const slashCommandsConfig = {
  suggestion: {
    /**
     * A function to filter the list items shown based on text query
     */
    items: ({ query }: { query: string }) => {
      const filteredItems: CommandItem[] = slashCommandItems
        .filter((item) =>
          item.title.toLowerCase().startsWith(query.toLowerCase())
        )
        .slice(0, 10);
      return filteredItems;
    },
    /**
     * A series of functions to control interactions with the suggestion menu
     */
    render: () => {
      let reactRenderer: ReactRenderer<
        any,
        SuggestionProps<CommandItem> & RefAttributes<any>
      >;
      let popup: TippyInstance[];

      return {
        onStart: (props: SuggestionProps) => {
          if (!props.clientRect) {
            return;
          }

          reactRenderer = new ReactRenderer(EditorCommandMenu, {
            props,
            editor: props.editor,
          });

          popup = tippy("body", {
            getReferenceClientRect: props.clientRect as any,
            appendTo: () => document.body,
            content: reactRenderer.element,
            showOnCreate: true,
            interactive: true,
            trigger: "manual",
            placement: "top-start",
          });
        },

        onUpdate(props: SuggestionProps) {
          reactRenderer.updateProps(props);

          if (!props.clientRect) {
            return;
          }

          popup[0].setProps({
            getReferenceClientRect: props.clientRect as any,
          });
        },

        onKeyDown(props: SuggestionKeyDownProps) {
          if (props.event.key === "Escape") {
            popup[0].hide();
            return true;
          }
          return reactRenderer.ref?.onKeyDown(props);
        },

        onExit() {
          popup[0].destroy();
          reactRenderer.destroy();
        },
      };
    },
  },
};
