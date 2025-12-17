import { defineReactNodeView } from 'prosekit/react';

import CodeBlockView from './code-block-view'

export function defineCodeBlockView() {
  return defineReactNodeView({
    name: 'codeBlock',
    contentAs: 'code',
    component: CodeBlockView,
  });
}
