"use client";

import { EditorContent, FloatingMenu, useEditor } from "@tiptap/react";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import EditorMenuBar from "./editorMenuBar";
import { BlogPostHtmlAtom } from "@/lib/jotai/atoms";
import { useAtom } from "jotai";
import { SlashCommands, slashCommandsConfig } from "@/lib/tiptap";
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
      Link,
      Underline,
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
