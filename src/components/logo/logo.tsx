import type { LinkProps } from "@mui/material/Link";

import { useId } from "react";
import { mergeClasses } from "minimal-shared/utils";
import { Box } from "@mui/material";

import Link from "@mui/material/Link";
import { styled, useTheme } from "@mui/material/styles";

import { RouterLink } from "../../routes/components";

import { logoClasses } from "./classes";

// ----------------------------------------------------------------------

export type LogoProps = LinkProps & {
  isSingle?: boolean;
  disabled?: boolean;
};

export function Logo({
  sx,
  disabled,
  className,
  href = "/",
  onScroll,
  isSingle = true,
  ...other
}: LogoProps) {
  const theme = useTheme();

  const gradientId = useId();

  const TEXT_PRIMARY = theme.vars.palette.text.primary;
  const PRIMARY_LIGHT = theme.vars.palette.primary.light;
  const PRIMARY_MAIN = theme.vars.palette.primary.main;
  const PRIMARY_DARKER = theme.vars.palette.primary.dark;

  return (
    <LogoRoot
      component={RouterLink}
      // href={href}
      aria-label="Logo"
      underline="none"
      className={mergeClasses([logoClasses.root, className])}
      sx={[
        {
          width: 147,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box
        component={"img"}
        src={href}
        alt="Logo"
        sx={{
          width: 1,
          height: 1,
        }}
      />
    </LogoRoot>
  );
}

// ----------------------------------------------------------------------

const LogoRoot = styled(Link)(() => ({
  flexShrink: 0,
  color: "transparent",
  display: "inline-flex",
  verticalAlign: "middle",
}));
