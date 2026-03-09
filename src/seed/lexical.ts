/**
 * Helpers to build Lexical rich text content for Payload CMS seeding
 * using the official @payloadcms/richtext-lexical API.
 */
import type { SerializedEditorState, SerializedLexicalNode } from 'lexical';

type TextNode = SerializedLexicalNode & {
  type: 'text';
  text: string;
  format: number;
  mode: string;
  detail: number;
  style: string;
};

type ElementNode = SerializedLexicalNode & {
  children: SerializedLexicalNode[];
  direction: 'ltr' | 'rtl' | null;
  format: string;
  indent: number;
};

function textNode(text: string, format: number = 0): TextNode {
  return {
    type: 'text',
    version: 1,
    text,
    format,
    mode: 'normal',
    detail: 0,
    style: '',
  };
}

/** Plain text paragraph */
export function p(text: string): ElementNode {
  return {
    type: 'paragraph',
    version: 1,
    children: [textNode(text)],
    direction: 'ltr',
    format: '',
    indent: 0,
    textFormat: 0,
    textStyle: '',
  } as ElementNode;
}

/** Heading node */
export function h2(text: string): ElementNode {
  return {
    type: 'heading',
    version: 1,
    tag: 'h2',
    children: [textNode(text)],
    direction: 'ltr',
    format: '',
    indent: 0,
  } as ElementNode;
}

export function h3(text: string): ElementNode {
  return {
    type: 'heading',
    version: 1,
    tag: 'h3',
    children: [textNode(text)],
    direction: 'ltr',
    format: '',
    indent: 0,
  } as ElementNode;
}

/** Bulleted list from string array */
export function ul(items: string[]): ElementNode {
  return {
    type: 'list',
    version: 1,
    listType: 'bullet',
    start: 1,
    tag: 'ul',
    direction: 'ltr',
    format: '',
    indent: 0,
    children: items.map((item, i) => ({
      type: 'listitem',
      version: 1,
      value: i + 1,
      children: [textNode(item)],
      direction: 'ltr',
      format: '',
      indent: 0,
    })),
  } as ElementNode;
}

/** Wrap nodes into a complete Lexical SerializedEditorState */
export function buildRichText(children: ElementNode[]): SerializedEditorState {
  return {
    root: {
      type: 'root',
      version: 1,
      children: children as SerializedLexicalNode[],
      direction: 'ltr',
      format: '',
      indent: 0,
    },
  };
}
