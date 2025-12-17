import { defineReactNodeView } from 'prosekit/react';

import ImageView from './image-view'

export function defineImageView() {
  return defineReactNodeView({
    name: 'image',
    component: ImageView,
  });
}
