// ScrollPane.tsx
import { styled, SxProps } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { forwardRef, HTMLAttributes } from 'react';
import { Theme } from '@mui/material';

interface ScrollPaneProps extends HTMLAttributes<HTMLDivElement> {
  minHeight?: string | number;
  maxHeight?: string | number;
  customScrollbar?: boolean; // enables override
  sx?: SxProps<Theme>; 
}

const ScrollPaneRoot = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'minHeight' && prop !== 'maxHeight' && prop !== 'customScrollbar',
})<ScrollPaneProps>(({ theme, minHeight = 100, maxHeight = 200, customScrollbar }) => ({
  paddingRight: '10px',
  padding: theme.spacing(1),
  borderRadius: theme.spacing(1),
  [theme.breakpoints.down('md')]: {
    overflow: 'hidden',
  },
  [theme.breakpoints.up('md')]: {
    overflowY: 'auto',
    width: '100%',
    minHeight,
    maxHeight,

    ...(customScrollbar !== true && {
      '&::-webkit-scrollbar': {
        width: '5px',
        borderRadius: '10px',
        WebkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,.3)',
      },
      '&::-webkit-scrollbar-thumb': {
        borderRadius: '10px',
        background: 'rgba(0,0,0,0.4)',
      },
      '&::-webkit-scrollbar-track': {
        background: 'rgba(0,0,0,0.1)',
      },
    }),
  },
}));

const ScrollPane = forwardRef<HTMLDivElement, ScrollPaneProps>(
  ({ children, minHeight, maxHeight, customScrollbar = false, ...rest }, ref) => (
    <ScrollPaneRoot
      ref={ref}
      minHeight={minHeight}
      maxHeight={maxHeight}
      customScrollbar={customScrollbar}
      {...rest}
    >
      {children}
    </ScrollPaneRoot>
  )
);

export default ScrollPane;
