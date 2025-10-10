import React from "react";
import { Link as RouterDomLink, LinkProps as RouterDomLinkProps } from "react-router-dom";

interface RouterLinkProps extends Omit<RouterDomLinkProps, "to"> {
  href: string;
}

export const RouterLink = React.forwardRef<HTMLAnchorElement, RouterLinkProps>(
  ({ href, ...other }, ref) => <RouterDomLink ref={ref} to={href} {...other} />
);

RouterLink.displayName = "RouterLink"; 
