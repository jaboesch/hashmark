"use client";

import {
  EditorContent,
  FloatingMenu,
  generateJSON,
  useEditor,
} from "@tiptap/react";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import StarterKit from "@tiptap/starter-kit";
import Gapcursor from "@tiptap/extension-gapcursor";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import React, { useEffect } from "react";
import EditorMenuBar from "./editorMenuBar";
import { BlogPostHtmlAtom } from "@/lib/jotai/atoms";
import { useAtom } from "jotai";
import { CustomLink, CustomSpan, SlashCommands, slashCommandsConfig } from "@/lib/tiptap";
import EditorBubbleMenu from "./editorBubbleMenu";
import { SAMPLE_CONTENT } from "@/lib/tiptap/constants";

const Editor = () => {
  const [html, setHtml] = useAtom(BlogPostHtmlAtom);

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
      Image,
      Gapcursor,
      CustomSpan,
      Table,
      TableCell,
      TableHeader,
      TableRow,
      SlashCommands.configure(slashCommandsConfig),
    ],
    onUpdate: ({ editor }) => {
      const draftHtml = editor.getHTML();
      setHtml(draftHtml);
    },
    content: SAMPLE_CONTENT,
  });

  return (
    <>
      {editor && <EditorBubbleMenu editor={editor} />}
      {editor && (
        <FloatingMenu editor={editor} className="text-[#aaa] font-light">
          Type / for commands
        </FloatingMenu>
      )}
      <div className="flex flex-col gap-2 w-full">
        {editor && <EditorMenuBar editor={editor} />}
        <EditorContent
          editor={editor}
          className="editor-body editor-container"
        />
      </div>
    </>
  );
};

export default Editor;
