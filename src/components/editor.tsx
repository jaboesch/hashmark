"use client";

import { EditorContent, FloatingMenu, useEditor } from "@tiptap/react";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import StarterKit from "@tiptap/starter-kit";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import React from "react";
import EditorMenuBar from "./editorMenuBar";
import {
  CustomLink,
  CustomSpan,
  SlashCommands,
  slashCommandsConfig,
} from "@/lib/tiptap";
import EditorBubbleMenu from "./editorBubbleMenu";

const Editor = ({
  initialHtml,
  updateHtml,
}: {
  initialHtml: string;
  updateHtml: (html: string) => void;
}) => {
  const editor = useEditor({
    injectCSS: false,
    editorProps: {
      attributes: {
        class: "mx-auto focus:outline-none min-h-[500px]",
      },
    },
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      CustomLink,
      Underline,
      Image.configure({
        HTMLAttributes: {
          loading: "lazy",
        },
      }),
      CustomSpan,
      Table,
      TableCell,
      TableHeader,
      TableRow,
      SlashCommands.configure(slashCommandsConfig),
    ],
    onUpdate: ({ editor }) => {
      const draftHtml = editor.getHTML();
      updateHtml(draftHtml);
    },
    content: initialHtml,
  });

  return (
    <div className="flex flex-col gap-2 w-full">
      {editor && <EditorBubbleMenu editor={editor} />}
      {editor && (
        <FloatingMenu
          editor={editor}
          className="text-[#aaa] font-light bg-white"
        >
          Type / for commands
        </FloatingMenu>
      )}
      {editor && <EditorMenuBar editor={editor} />}
      <EditorContent
        editor={editor}
        className="hashmark-content shadow-sm rounded-sm"
      />
    </div>
  );
};

export default Editor;
