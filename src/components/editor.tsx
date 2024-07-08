"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import EditorMenuBar from "./editorMenuBar";
import { BlogPostHtmlAtom } from "@/lib/jotai/atoms";
import { useAtom } from "jotai";
import { SlashCommandLogging } from "@/lib/tiptap";
import EditorBubbleMenu from "./editorBubbleMenu";

const Editor = () => {
  const [html, setHtml] = useAtom(BlogPostHtmlAtom);
  console.log("HTML", html);
  const editor = useEditor({
    injectCSS: false,
    editorProps: {
      attributes: {
        class: "mx-auto focus:outline-none",
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
      SlashCommandLogging
    ],
    onUpdate: ({ editor }) => {
      const draftHtml = editor.getHTML();
      console.log("Draft HTML", draftHtml);
      setHtml(draftHtml);
    },
    content: `
        <h1>Welcome to Our Editor</h1>
  <p>This is a simple paragraph to test the text styling similar to <strong>Notion</strong>. Here's a link to <a href="https://www.example.com">Example Website</a>.</p>
  
  <h2>Subheading Level 2</h2>
  <p>Additional text under a subheading. This text includes <em>italic</em>, <strong>bold</strong>, and <u>underline</u> styles.</p>
  
  <h3>Subheading Level 3</h3>
  <p>Even more text under a smaller subheading. Here's some <s>strikethrough</s> text.</p>

  <p>Inline <code>code</code> snippet.</p>
  <pre><code>// This is a block of code
function helloWorld() {
  console.log("Hello, world!");
}</code></pre>

  <ul>
    <li>Bullet list item 1</li>
    <li>Bullet list item 2</li>
    <li>Bullet list item 3</li>
  </ul>

  <hr>

  <blockquote>This is a blockquote. It's a great way to highlight important information.</blockquote>

  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nec feugiat in fermentum posuere urna nec tincidunt. Massa tempor nec feugiat nisl pretium fusce. Risus viverra adipiscing at in tellus integer feugiat scelerisque varius. Commodo viverra maecenas accumsan lacus vel facilisis. Egestas pretium aenean pharetra magna ac placerat vestibulum lectus mauris. Penatibus et magnis dis parturient. Integer vitae justo eget magna fermentum iaculis eu. Sed cras ornare arcu dui vivamus. Justo donec enim diam vulputate ut. Urna neque viverra justo nec ultrices dui sapien eget. Donec ac odio tempor orci dapibus ultrices in iaculis. Integer malesuada nunc vel risus commodo viverra maecenas. Ultricies mi eget mauris pharetra et ultrices neque ornare. Iaculis eu non diam phasellus vestibulum lorem. Nec ullamcorper sit amet risus. A condimentum vitae sapien pellentesque habitant morbi. Cum sociis natoque penatibus et magnis dis.</p>

<p>Mi quis hendrerit dolor magna. Pharetra et ultrices neque ornare aenean euismod. Arcu bibendum at varius vel pharetra. Lectus proin nibh nisl condimentum id venenatis a condimentum vitae. Sociis natoque penatibus et magnis dis parturient montes. Sit amet facilisis magna etiam tempor. Dignissim sodales ut eu sem integer vitae justo eget. Aliquam nulla facilisi cras fermentum. Dignissim suspendisse in est ante in nibh. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel. Nulla aliquet porttitor lacus luctus accumsan. Suspendisse potenti nullam ac tortor vitae purus. Tincidunt tortor aliquam nulla facilisi cras. Arcu dictum varius duis at consectetur lorem. Urna nec tincidunt praesent semper feugiat nibh sed pulvinar. Id donec ultrices tincidunt arcu. Enim facilisis gravida neque convallis a. Tempor orci eu lobortis elementum nibh tellus molestie nunc non. Auctor eu augue ut lectus.</p>

<p>Et ultrices neque ornare aenean euismod elementum nisi. Aliquet sagittis id consectetur purus ut faucibus pulvinar elementum integer. Elit duis tristique sollicitudin nibh sit. Bibendum est ultricies integer quis auctor. Egestas egestas fringilla phasellus faucibus scelerisque eleifend. Ultricies leo integer malesuada nunc vel risus commodo viverra. Vestibulum mattis ullamcorper velit sed. Pharetra et ultrices neque ornare aenean euismod elementum nisi quis. Gravida cum sociis natoque penatibus et magnis dis parturient. Id venenatis a condimentum vitae sapien pellentesque habitant. Lectus sit amet est placerat in egestas erat imperdiet. Eu volutpat odio facilisis mauris sit amet massa. Sed arcu non odio euismod. Quis hendrerit dolor magna eget.</p>

<p>Commodo ullamcorper a lacus vestibulum sed arcu non odio. Libero volutpat sed cras ornare arcu dui vivamus. Amet volutpat consequat mauris nunc congue nisi vitae. Dui id ornare arcu odio ut. Blandit cursus risus at ultrices. Enim praesent elementum facilisis leo vel fringilla est. Donec massa sapien faucibus et molestie ac feugiat sed. Enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra. Pellentesque nec nam aliquam sem. At auctor urna nunc id cursus metus aliquam. Dolor magna eget est lorem. Leo in vitae turpis massa sed elementum. Ut venenatis tellus in metus vulputate eu. Vehicula ipsum a arcu cursus vitae congue mauris rhoncus aenean. Suscipit adipiscing bibendum est ultricies integer.</p>

<p>Auctor augue mauris augue neque gravida in. Magna fringilla urna porttitor rhoncus dolor purus non enim praesent. Enim nec dui nunc mattis enim ut tellus elementum. Nulla facilisi cras fermentum odio. Libero volutpat sed cras ornare arcu dui. At imperdiet dui accumsan sit amet nulla facilisi morbi. Nunc sed id semper risus in hendrerit gravida rutrum quisque. Ullamcorper velit sed ullamcorper morbi tincidunt ornare. Purus in massa tempor nec feugiat nisl pretium. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Feugiat in fermentum posuere urna nec tincidunt praesent. Enim ut sem viverra aliquet eget sit amet tellus. Interdum posuere lorem ipsum dolor sit. Sed nisi lacus sed viverra tellus.</p>
      `,
  });

  return (
    <>
      {editor && <EditorBubbleMenu editor={editor} />}
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
