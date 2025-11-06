declare global {
  namespace JSX {
    interface IntrinsicElements {
      'wistia-player': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        'media-id'?: string;
        aspect?: string;
      };
    }
  }
}

// This empty export is needed to make this file a module.
export {};
