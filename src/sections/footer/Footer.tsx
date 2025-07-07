import {
  Box,
  Button,
  Collapse,
  Container,
  Divider,
  List,
  ListItem,
  ListItemButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import navLogo from "src/assets/logo/navlogopwhite.png";

import fb from "src/assets/icons/fb.png";
import linkedin from "src/assets/icons/linkedin.png";
import insta from "src/assets/icons/insta.png";
import { useQuery } from "@apollo/client";
import { GetFooterMenuItemsData } from "src/types/graphql/types/common.types";
import { GET_FOOTER_MENU_ITEMS } from "src/graphql/queries";
import { usePathname, useRouter } from "src/routes/hooks";
import LoadingFallback from "src/components/LoadingFallback";
import { Scrollbar } from "src/components/scrollbar";
import { RouterLink } from "src/routes/components";
import { Iconify } from "src/components/iconify";

interface MenuItem {
  id: string;
  label: string;
  url: string;
  uri: string;
  parentId: string | null;
  order: number;
  children?: MenuItem[];
}

function MenuItemRenderer({
  item,
  depth = 0,
  pathname,
  openSections,
  handleToggle,
}: {
  item: MenuItem;
  depth?: number;
  pathname: string;
  openSections: Record<string, boolean>;
  handleToggle: (id: string) => void;
}) {
  const isItemActive = (menuItem: MenuItem): boolean => {
    if (menuItem.uri === pathname) return true;
    if (menuItem.children && menuItem.children.length > 0) {
      return menuItem.children.some((child) => isItemActive(child));
    }
    return false;
  };

  const hasChildren = item.children && item.children.length > 0;
  const paddingLeft = 2 + depth * 2;

  return (
    <Box key={item.id}>
      <ListItem disableGutters disablePadding>
        <ListItemButton
          component={hasChildren ? "div" : RouterLink}
          href={hasChildren ? undefined : item.uri}
          onClick={() => hasChildren && handleToggle(item.id)}
          disableGutters
          sx={(theme) => ({
            // pl: paddingLeft,
            py: 1,
            pr: 1.5,
            gap: 2,
            borderRadius: 0.75,
            typography: "h5",
            textAlign: "left !important",
            fontWeight: "500 !important",
            letterSpacing: "0%",
            minHeight: 44,
            m: "5px 0",
            ...(depth === 0 && {
              color: "rgba(249, 250, 251, 0.6)",
              // textDecoration: "underline !important",
              // textUnderlineOffset: "5px",
            }),
            ...(depth !== 0 && {
              color: "rgba(249, 250, 251, 1)",
              paddingLeft: 2.5,
            }),
          })}
        >
          <Box
            component="span"
            sx={{
              flexGrow: 1,
              ...(hasChildren && {}),
            }}
          >
            {item.label}
          </Box>
          {hasChildren && (
            <Iconify
              onClick={() => hasChildren && handleToggle(item.id)}
              icon={
                openSections[item.id]
                  ? "ic:round-keyboard-arrow-down"
                  : "ic:round-keyboard-arrow-right"
              }
              sx={{
                color: "#fff",
              }}
            />
          )}
        </ListItemButton>
      </ListItem>

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
              />
            ))}
          </List>
        </Collapse>
      )}
    </Box>
  );
}

const Footer = () => {
  const { data, loading } = useQuery<GetFooterMenuItemsData>(
    GET_FOOTER_MENU_ITEMS
  );
  const pathname = usePathname();
  const router = useRouter();

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const handleToggle = (id: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (loading) return <LoadingFallback />;

  function buildNestedMenu(menuItems: MenuItem[]): MenuItem[] {
    const map: { [key: string]: MenuItem } = {};
    const tree: MenuItem[] = [];

    menuItems.forEach((item) => {
      map[item.id] = { ...item, children: [] };
    });

    menuItems.forEach((item) => {
      if (item.parentId && map[item.parentId]) {
        map[item.parentId].children!.push(map[item.id]);
      } else {
        tree.push(map[item.id]);
      }
    });

    const sortByOrder = (items: MenuItem[]) => {
      items.sort((a, b) => a.order - b.order);
      items.forEach((item) => {
        if (item.children && item.children.length > 0) {
          sortByOrder(item.children);
        }
      });
    };

    sortByOrder(tree);
    return tree;
  }

  const menuItems: MenuItem[] = data?.menu?.menuItems?.nodes ?? [];
  const nestedMenu = buildNestedMenu(menuItems);

  const currentYear = new Date().getFullYear();
  return (
    <Stack color={"white"} sx={{ background: "rgba(26, 32, 44, 1)" }}>
      <Container maxWidth="xl" sx={{ p: { xs: 0, md: 3 } }}>
        <Stack gap={2}>
          <Stack
            alignItems={"center"}
            direction={"row"}
            justifyContent={"space-between"}
          >
            <Box
              component={"img"}
              src={navLogo}
              width={{ xs: "100px", sm: "152px" }}
              sx={{ cursor: "pointer" }}
            />
            <Stack direction={"row"} alignItems={"center"} gap={2}>
              <Box
                onClick={() => window.open("https://www.facebook.com/blackstoneshippinggroup", "_blank")}                
                component={"img"}
                src={fb}
                width={{ xs: "40px", sm: "60px" }}
                sx={{ cursor: "pointer", "&:hover": { transform: "scale(1.03)" } }}
              />
              <Box
                onClick={() => window.open("https://www.linkedin.com/company/blackstone-shipping-group/", "_blank")}   
                component={"img"}
                src={linkedin}
                width={{ xs: "40px", sm: "60px" }}
                sx={{ cursor: "pointer", "&:hover": { transform: "scale(1.03)" } }}
              />
              <Box
                onClick={() => window.open("https://www.instagram.com/blackstoneshipping/", "_blank")}   
                component={"img"}
                src={insta}
                width={{ xs: "40px", sm: "60px" }}
                sx={{ cursor: "pointer", "&:hover": { transform: "scale(1.03)" } }}
              />
            </Stack>
          </Stack>
          <Divider
            sx={{
              border: "1px solid rgba(109, 110, 113, 1)",
              mb: { xs: 0, md: 4 },
            }}
          />
          {/* Large device */}
          <Stack
            display={{ xs: "none", lg: "flex" }}
            direction={"row"}
            justifyContent={"space-between"}
          >
            <Stack gap={3}>
              <Typography variant="h2" fontWeight={600}>
                Subscribe to Newsletters
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter your email address"
                variant="outlined"
                InputLabelProps={{
                  style: { color: "rgba(249, 250, 251, 0.6)" },
                }}
                InputProps={{
                  style: { color: "white" },
                }}
                sx={{
                  borderRadius: "4px",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "rgba(45, 55, 72, 1)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(109, 110, 113, 0.8)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "rgba(109, 110, 113, 1)",
                    },
                  },
                }}
              />
              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: "rgba(26, 86, 219, 1)",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgba(26, 86, 2111, 1)",
                  },
                }}
              >
                Subscribe
              </Button>
            </Stack>
            <Stack gap={2} height={"700px"} flexWrap={"wrap"}>
              {nestedMenu.map((item, idx) => (
                <Stack key={idx}>
                  <Typography
                    component={"div"}
                    onClick={() => {
                      router.push(item.uri);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    variant="body2"
                    color="rgba(249, 250, 251, 0.6)"
                    sx={{
                      textDecoration: "underline",
                      textUnderlineOffset: "5px",
                      cursor: "pointer",
                    }}
                  >
                    {item.label}
                  </Typography>
                  {item?.children?.map((subItem, subIdx) => (
                    <Typography
                      component={"div"}
                      onClick={() => router.push(subItem.uri)}
                      key={subIdx}
                      variant="body2"
                      color="white"
                      sx={{ my: 0.5, cursor: "pointer" }}
                    >
                      {subItem.label}
                    </Typography>
                  ))}
                </Stack>
              ))}
            </Stack>
          </Stack>

          {/* Mobile Device */}

          <Stack display={{ xs: "flex", lg: "none" }}>
            <Box
              component="nav"
              sx={[
                {
                  display: "flex",
                  flex: "1 1 auto",
                  height: "100%",
                  flexDirection: "column",
                },
              ]}
            >
              <List sx={{ p: 0, m: 0 }}>
                {nestedMenu.map((item, idx) => (
                  <React.Fragment key={item.id}>
                    <MenuItemRenderer
                      item={item}
                      depth={0}
                      pathname={pathname}
                      openSections={openSections}
                      handleToggle={handleToggle}
                    />
                    {idx < menuItems.length - 1 && (
                      <Divider
                        sx={{
                          my: 0.5,
                          backgroundColor: "rgba(45, 55, 72, 0.1)",
                        }}
                      />
                    )}
                  </React.Fragment>
                ))}
              </List>
            </Box>

            <Stack gap={2} my={2}>
              <Typography variant="h2" fontWeight={600}>
                Subscribe to Newsletters
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter your email address"
                variant="outlined"
                InputLabelProps={{
                  style: { color: "rgba(249, 250, 251, 0.6)" },
                }}
                InputProps={{
                  style: { color: "white" },
                }}
                sx={{
                  borderRadius: "4px",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "rgba(45, 55, 72, 1)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(109, 110, 113, 0.8)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "rgba(109, 110, 113, 1)",
                    },
                  },
                }}
              />
              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: "rgba(26, 86, 219, 1)",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgba(26, 86, 2111, 1)",
                  },
                }}
              >
                Subscribe
              </Button>
            </Stack>
          </Stack>

          <Divider sx={{ border: "1px solid rgba(109, 110, 113, 1)" }} />
          <Stack alignItems={{ xs: "center", md: "flex-end" }} my={2}>
            <Typography
              variant="body2"
              color="rgba(249, 250, 251, 0.6)"
              fontWeight={400}
            >
              © {currentYear} Blackstone Shipping. All rights reserved.
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
};

export default Footer;
