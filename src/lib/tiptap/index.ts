import { Extension } from '@tiptap/core';
import { Suggestion } from '@tiptap/suggestion';

export const SlashCommandLogging = Extension.create({
  name: 'slashCommandLogging',

  addOptions() {
    return {
      suggestion: {
        char: '/',
        startOfLine: false, // set true if you want the command only at the start of lines
        command: ({ editor, range }) => {
          console.log("Slash typed!");
        }
      }
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      })
    ];
  },
});
