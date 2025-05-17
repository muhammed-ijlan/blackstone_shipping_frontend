declare module 'simplebar-react' {
  import * as React from 'react';

  interface SimpleBarProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    scrollableNodeProps?: object;
    clickOnTrack?: boolean;
    forceVisible?: boolean | 'x' | 'y';
    autoHide?: boolean;
    timeout?: number;
    direction?: 'rtl' | 'ltr';
  }

  export default class SimpleBar extends React.Component<SimpleBarProps> {}
}
