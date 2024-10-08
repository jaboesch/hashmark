import { Editor } from "@tiptap/react";
import React, { useState } from "react";
import EditorButton from "./editorButton";
import { MdHorizontalRule } from "react-icons/md";
import { BsImage, BsImages } from "react-icons/bs";
import {
  LuBold,
  LuCode2,
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuItalic,
  LuList,
  LuListOrdered,
  LuRedo2,
  LuRemoveFormatting,
  LuText,
  LuTextQuote,
  LuUnderline,
  LuUndo2,
} from "react-icons/lu";
import { PLACEHOLDER_IMAGE_ROW } from "@/lib/tiptap/constants";
import ImageModal from "./imageModal";
import { set } from "react-hook-form";

type Props = {
  editor: Editor;
};

const EditorMenuBar = ({ editor }: Props) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const addImage = () => setIsImageModalOpen(true);

  const onImageFormSubmit = ({ src, alt }: { src: string; alt: string }) => {
    editor.chain().focus().setImage({ src, alt }).run();
  };

  return (
    <div className="bg-white rounded-sm shadow-sm w-full max-w-[800px] mx-auto flex flex-row flex-wrap gap-1 p-2 align-middle justify-between ">
      <ImageModal
        isOpen={isImageModalOpen}
        onSubmit={onImageFormSubmit}
        onRequestClose={() => setIsImageModalOpen(false)}
      />
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
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        label="Clear Marks"
      >
        <LuRemoveFormatting className="size-full" />
      </EditorButton>

      <EditorButton
        onClick={() => editor.chain().focus().setParagraph().run()}
        isActive={editor.isActive("paragraph")}
        label="Paragraph"
      >
        <LuText className="size-full" />
      </EditorButton>

      <EditorButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={editor.isActive("heading", { level: 1 })}
        label="Heading 1"
      >
        <LuHeading1 className="size-full" />
      </EditorButton>

      <EditorButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive("heading", { level: 2 })}
        label="Heading 2"
      >
        <LuHeading2 className="size-full" />
      </EditorButton>

      <EditorButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        isActive={editor.isActive("heading", { level: 3 })}
        label="Heading 3"
      >
        <LuHeading3 className="size-full" />
      </EditorButton>

      <EditorButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive("bulletList")}
        label="Bullet List"
      >
        <LuList className="size-full" />
      </EditorButton>
      <EditorButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive("orderedList")}
        label="Ordered List"
      >
        <LuListOrdered className="size-full" />
      </EditorButton>
      <EditorButton
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        isActive={editor.isActive("codeBlock")}
        label="Code Block"
      >
        <LuCode2 className="size-full" />
      </EditorButton>

      <EditorButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive("blockquote")}
        label="Blockquote"
      >
        <LuTextQuote className="size-full" />
      </EditorButton>

      <EditorButton onClick={addImage} label="Image">
        <BsImage className="size-full" />
      </EditorButton>

      <EditorButton
        onClick={() =>
          editor.chain().focus().insertContent(PLACEHOLDER_IMAGE_ROW).run()
        }
        label="Image Row"
      >
        <BsImages className="size-full" />
      </EditorButton>

      <EditorButton
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        label="Horizontal Rule"
      >
        <MdHorizontalRule className="size-full" />
      </EditorButton>

      <EditorButton
        onClick={() => editor.chain().focus().undo().run()}
        isDisabled={!editor.can().chain().focus().undo().run()}
        label="Undo"
      >
        <LuUndo2 className="size-full" />
      </EditorButton>

      <EditorButton
        onClick={() => editor.chain().focus().redo().run()}
        isDisabled={!editor.can().chain().focus().redo().run()}
        label="Redo"
      >
        <LuRedo2 className="size-full" />
      </EditorButton>
    </div>
  );
};

export default EditorMenuBar;
