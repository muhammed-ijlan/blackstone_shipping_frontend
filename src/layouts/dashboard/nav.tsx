import { useEffect, useState } from "react";
import { useTheme, type Theme, type SxProps } from "@mui/material/styles";
import {
  Box,
  Stack,
  List,
  ListItem,
  ListItemButton,
  Drawer,
  drawerClasses,
  Collapse,
  Divider,
} from "@mui/material";

import { usePathname } from "../../routes/hooks";
import { RouterLink } from "../../routes/components";
import { Scrollbar } from "../../components/scrollbar";
import { Logo } from "../../components/logo";
import { Iconify } from "src/components/iconify";

import logo from "../../assets/logo/navlogo.png";
import type { WorkspacesPopoverProps } from "../components/workspaces-popover";
import { varAlpha } from "minimal-shared/utils";
import { MenuItem } from "src/types/graphql/types/menu.types";

export type NavContentProps = {
  data: MenuItem[];
  slots?: {
    topArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
  workspaces: WorkspacesPopoverProps["data"];
  sx?: SxProps<Theme>;
};

export function NavMobile({
  sx,
  data,
  open,
  slots,
  onClose,
  workspaces,
}: NavContentProps & { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  useEffect(() => {
    if (open) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          pt: 2.5,
          px: 2.5,
          overflow: "unset",
          width: "100%",
          ...sx,
        },
      }}
    >
      <NavContent
        data={data}
        slots={slots}
        workspaces={workspaces}
        onClose={onClose}
      />
    </Drawer>
  );
}

function MenuItemRenderer({
  item,
  depth = 0,
  pathname,
  openSections,
  handleToggle,
  onClose,
}: {
  item: MenuItem;
  depth?: number;
  pathname: string;
  openSections: Record<string, boolean>;
  handleToggle: (id: string) => void;
  onClose: () => void;
}) {
  const isItemActive = (menuItem: MenuItem): boolean => {
    if (menuItem.uri === pathname) return true;
    if (menuItem.children && menuItem.children.length > 0) {
      return menuItem.children.some((child) => isItemActive(child));
    }
    return false;
  };

  const isActive = isItemActive(item);
  const hasChildren = item.children && item.children.length > 0;
  const paddingLeft = 2 + depth * 2;

  const isParent = depth === 0;
  const isChildWithChildren = depth > 0 && hasChildren;
  const isExternal = item.uri?.startsWith("http");

  return (
    <Box key={item.id}>
      <ListItem disableGutters disablePadding>

        <ListItemButton
          component={hasChildren || isExternal ? "div" : RouterLink}
          href={!hasChildren && !isExternal ? item.uri : undefined}
          onClick={() => {
            if (hasChildren) {
              handleToggle(item.id);
            } else if (item.uri) {
              if (isExternal) {
                window.open(item.uri, "_blank");
                onClose();
              } else {
                if (item.uri === pathname) {
                  onClose(); // same page
                } else {

                  onClose();
                }
              }
            }
          }}
          disableGutters
          sx={(theme) => ({
            pl: paddingLeft,
            py: 1,
            pr: 1.5,
            gap: 2,
            borderRadius: 0.75,
            typography: "h4",
            textAlign: "left !important",
            fontWeight: "600",
            color: "rgba(11, 19, 40, 0.7)",
            minHeight: 44,
            m: "5px 0",
            ...(isActive && {
              fontWeight: "fontWeightSemiBold",
              color: "rgba(26, 32, 44, 1)",
              "&:hover": {
                bgcolor: varAlpha(theme.vars.palette.primary.mainChannel, 0.16),
              },
            }),
            ...(isChildWithChildren && {
              color: "rgba(26, 86, 219, 1)",
              border: "1px solid rgba(109, 110, 113, 0.1)",
            }),
          })}
        >
          <Box component="span" sx={{ flexGrow: 1 }}>
            {item.label}
          </Box>
          {hasChildren && (
            <Iconify
              icon={
                openSections[item.id]
                  ? "ic:round-keyboard-arrow-down"
                  : "ic:round-keyboard-arrow-right"
              }
              sx={{
                color: isChildWithChildren ? "#fff" : "rgba(11, 19, 40, 0.7)",
                ...(isActive && {
                  color: "rgba(26, 32, 44, 1)",
                }),
                ...(isChildWithChildren && {
                  color: "rgba(26, 86, 219, 1)",
                }),
              }}
            />
          )}
        </ListItemButton>
      </ListItem>

      {/* Divider only for parent-level items */}
      {isParent && (
        <Divider
          sx={{
            my: 0.5,
            mx: paddingLeft > 2 ? 2 : 0,
            backgroundColor: "rgba(45, 55, 72, 0.1)",
          }}
        />
      )}

      {hasChildren && (
        <Collapse in={openSections[item.id]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children?.map((child) => (
              <MenuItemRenderer
                key={child.id}
                item={child}
                depth={depth + 1}
                pathname={pathname}
                openSections={openSections}
                handleToggle={handleToggle}
                onClose={onClose}
              />
            ))}
          </List>
        </Collapse>
      )}
    </Box>
  );
}

export function NavContent({
  data,
  slots,
  workspaces,
  sx,
  onClose,
}: NavContentProps & { onClose: () => void }) {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const handleToggle = (id: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    const initializeOpenSections = (items: MenuItem[], parentId?: string) => {
      items.forEach((item) => {
        if (
          item.url === pathname ||
          (item.children &&
            item.children.some((child) => child.url === pathname))
        ) {
          setOpenSections((prev) => ({ ...prev, [parentId || item.id]: true }));
        }
        if (item.children) {
          initializeOpenSections(item.children, item.id);
        }
      });
    };

    initializeOpenSections(data);
  }, [data, pathname]);

  return (
    <>
      <Scrollbar  fillContent sx={{
        
      }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Logo href={logo} sx={{ width: "100px" }} />
          <Iconify
            width={30}
            icon="ic:round-close"
            onClick={onClose}
            sx={{ color: "rgba(45, 55, 72, 1)", cursor: "pointer" }}
          />
        </Stack>
        <Divider />
        {slots?.topArea}
        <Box
          component="nav"
          sx={[
            {
              display: "flex",
              flex: "1 1 auto",
              height: "70vh",
              flexDirection: "column",
            },
            ...(Array.isArray(sx) ? sx : [sx]),
          ]}
        >
          <List sx={{ p: 0, m: 0 }}>
            {data.map((item) => (
              <MenuItemRenderer
                key={item.id}
                item={item}
                depth={0}
                pathname={pathname}
                openSections={openSections}
                handleToggle={handleToggle}
                onClose={onClose} 
              />
            ))}
          </List>
        </Box>
      </Scrollbar>
      {/* {slots?.bottomArea} */}
    </>
  );
}
