// src/lib/dummy.ts
import { Plugin } from 'vite';

export function componentTagger(): Plugin {
  return {
    name: 'dummy-component-tagger',
    apply: 'serve', // applies only in dev mode
    transform(code, id) {
      // No-op
      return null;
    },
  };
}
