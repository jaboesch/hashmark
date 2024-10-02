import { BubbleMenu, Editor } from "@tiptap/react";
import React, { useCallback, useState } from "react";
import EditorButton from "./editorButton";
import {
  LuBold,
  LuCode2,
  LuItalic,
  LuLink,
  LuStrikethrough,
  LuUnderline,
} from "react-icons/lu";
import ImageModal from "./imageModal";
import clsx from "clsx";

type Props = {
  editor: Editor;
};

const EditorBubbleMenu = ({ editor }: Props) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const setLink = useCallback(() => {
    if (editor.isActive("image")) {
      setIsImageModalOpen(true);
      return;
    }

    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter the URL here:", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const onImageFormSubmit = ({
    src,
    alt,
  }: {
    src: string;
    alt: string;
  }) => {
    editor.chain().focus().setImage({ src, alt }).run();
  };

  return (
    <>
      <ImageModal
        isOpen={isImageModalOpen}
        onSubmit={onImageFormSubmit}
        onRequestClose={() => setIsImageModalOpen(false)}
      />
      <BubbleMenu
        className={clsx("flex flex-row p-1 gap-1 bg-white border shadow-sm rounded-md", isImageModalOpen && "hidden")}
        tippyOptions={{ duration: 100 }}
        editor={editor}
      >
        <EditorButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isDisabled={!editor.can().chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
          label="Bold"
        >
          <LuBold className="size-full" />
        </EditorButton>
        <EditorButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isDisabled={!editor.can().chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
          label="Italic"
        >
          <LuItalic className="size-full" />
        </EditorButton>
        <EditorButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isDisabled={!editor.can().chain().focus().toggleUnderline().run()}
          isActive={editor.isActive("underline")}
          label="Underline"
        >
          <LuUnderline className="size-full" />
        </EditorButton>
        <EditorButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isDisabled={!editor.can().chain().focus().toggleStrike().run()}
          isActive={editor.isActive("strike")}
          label="Strikethrough"
        >
          <LuStrikethrough className="size-full" />
        </EditorButton>
        <EditorButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          isDisabled={!editor.can().chain().focus().toggleCode().run()}
          isActive={editor.isActive("code")}
          label="Code"
        >
          <LuCode2 className="size-full" />
        </EditorButton>
        {editor.isActive("link") ? (
          <EditorButton
            onClick={() => editor.chain().focus().unsetLink().run()}
            label="Unset link"
            isActive
          >
            <LuLink className="size-full" />
          </EditorButton>
        ) : (
          <EditorButton onClick={setLink} label="Set link">
            <LuLink className="size-full" />
          </EditorButton>
        )}
      </BubbleMenu>
    </>
  );
};

export default EditorBubbleMenu;
