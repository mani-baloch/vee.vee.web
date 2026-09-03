'use client';

import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  Unlink,
  Undo,
  Redo,
  RemoveFormatting,
} from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
  className?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content,
  onChange,
  className = '',
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-[#0F4A3E] underline font-medium hover:text-[#2D9B7C]',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      }),
    ],
    content: content || '',
    editorProps: {
      attributes: {
        class:
          'min-h-[300px] max-h-[600px] overflow-y-auto px-4 py-3.5 focus:outline-none text-sm text-gray-800 leading-relaxed font-sans prose prose-sm max-w-none',
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html === '<p></p>' ? '' : html);
    },
    immediatelyRender: false,
  });

  // Sync external content changes if editor content is different
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || '');
    }
  }, [content, editor]);

  if (!editor) {
    return (
      <div className="min-h-[320px] rounded-2xl border border-gray-200 bg-gray-50 flex items-center justify-center text-xs text-gray-400">
        Loading editor...
      </div>
    );
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Enter link URL (e.g. https://example.com):', previousUrl);

    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div className={`rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-2xs ${className}`}>
      {/* Formatting Toolbar */}
      <div className="border-b border-gray-100 bg-gray-50/70 p-2 flex flex-wrap items-center gap-1">
        {/* Headings */}
        <div className="flex items-center gap-0.5 pr-2 border-r border-gray-200">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`p-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              editor.isActive('heading', { level: 1 })
                ? 'bg-[#0F4A3E] text-white'
                : 'text-gray-700 hover:bg-gray-200/80'
            }`}
            title="Heading 1"
          >
            <Heading1 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              editor.isActive('heading', { level: 2 })
                ? 'bg-[#0F4A3E] text-white'
                : 'text-gray-700 hover:bg-gray-200/80'
            }`}
            title="Heading 2"
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`p-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              editor.isActive('heading', { level: 3 })
                ? 'bg-[#0F4A3E] text-white'
                : 'text-gray-700 hover:bg-gray-200/80'
            }`}
            title="Heading 3"
          >
            <Heading3 className="w-4 h-4" />
          </button>
        </div>

        {/* Text Formatting */}
        <div className="flex items-center gap-0.5 px-2 border-r border-gray-200">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              editor.isActive('bold')
                ? 'bg-[#0F4A3E] text-white'
                : 'text-gray-700 hover:bg-gray-200/80'
            }`}
            title="Bold (Ctrl+B)"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              editor.isActive('italic')
                ? 'bg-[#0F4A3E] text-white'
                : 'text-gray-700 hover:bg-gray-200/80'
            }`}
            title="Italic (Ctrl+I)"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              editor.isActive('underline')
                ? 'bg-[#0F4A3E] text-white'
                : 'text-gray-700 hover:bg-gray-200/80'
            }`}
            title="Underline (Ctrl+U)"
          >
            <UnderlineIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Lists & Quotes */}
        <div className="flex items-center gap-0.5 px-2 border-r border-gray-200">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              editor.isActive('bulletList')
                ? 'bg-[#0F4A3E] text-white'
                : 'text-gray-700 hover:bg-gray-200/80'
            }`}
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              editor.isActive('orderedList')
                ? 'bg-[#0F4A3E] text-white'
                : 'text-gray-700 hover:bg-gray-200/80'
            }`}
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              editor.isActive('blockquote')
                ? 'bg-[#0F4A3E] text-white'
                : 'text-gray-700 hover:bg-gray-200/80'
            }`}
            title="Blockquote"
          >
            <Quote className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`p-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              editor.isActive('codeBlock')
                ? 'bg-[#0F4A3E] text-white'
                : 'text-gray-700 hover:bg-gray-200/80'
            }`}
            title="Code Block"
          >
            <Code className="w-4 h-4" />
          </button>
        </div>

        {/* Links */}
        <div className="flex items-center gap-0.5 px-2 border-r border-gray-200">
          <button
            type="button"
            onClick={setLink}
            className={`p-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              editor.isActive('link')
                ? 'bg-[#0F4A3E] text-white'
                : 'text-gray-700 hover:bg-gray-200/80'
            }`}
            title="Insert Link"
          >
            <LinkIcon className="w-4 h-4" />
          </button>
          {editor.isActive('link') && (
            <button
              type="button"
              onClick={() => editor.chain().focus().unsetLink().run()}
              className="p-1.5 rounded-lg text-xs font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              title="Remove Link"
            >
              <Unlink className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Clear & Undo/Redo */}
        <div className="flex items-center gap-0.5 pl-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
            className="p-1.5 rounded-lg text-xs text-gray-500 hover:bg-gray-200/80 transition-colors cursor-pointer"
            title="Clear Formatting"
          >
            <RemoveFormatting className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="p-1.5 rounded-lg text-xs text-gray-500 hover:bg-gray-200/80 transition-colors disabled:opacity-30 cursor-pointer"
            title="Undo"
          >
            <Undo className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="p-1.5 rounded-lg text-xs text-gray-500 hover:bg-gray-200/80 transition-colors disabled:opacity-30 cursor-pointer"
            title="Redo"
          >
            <Redo className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Editor Content Surface */}
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
