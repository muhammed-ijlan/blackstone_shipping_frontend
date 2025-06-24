import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import navLogo from "src/assets/logo/navlogopwhite.png";

import fb from "src/assets/icons/fb.png";
import linkedin from "src/assets/icons/linkedin.png";
import insta from "src/assets/icons/insta.png";
import { useQuery } from "@apollo/client";
import { GetFooterMenuItemsData } from "src/types/graphql/types/common.types";
import { GET_FOOTER_MENU_ITEMS } from "src/graphql/queries";
import { useRouter } from "src/routes/hooks";

interface MenuItem {
  id: string;
  label: string;
  url: string;
  uri: string;
  parentId: string | null;
  order: number;
  children?: MenuItem[];
}

const Footer = () => {
  const { data } = useQuery<GetFooterMenuItemsData>(GET_FOOTER_MENU_ITEMS);
  const router = useRouter();

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
      <Container maxWidth="xl" sx={{ p: 3 }}>
        <Stack gap={2}>
          <Stack
            alignItems={"center"}
            direction={"row"}
            justifyContent={"space-between"}
          >
            <Box
              component={"img"}
              src={navLogo}
              width={"152px"}
              sx={{ cursor: "pointer" }}
            />
            <Stack direction={"row"} alignItems={"center"} gap={2}>
              <Box
                component={"img"}
                src={fb}
                width={"60px"}
                sx={{ cursor: "pointer" }}
              />
              <Box
                component={"img"}
                src={linkedin}
                width={"60px"}
                sx={{ cursor: "pointer" }}
              />
              <Box
                component={"img"}
                src={insta}
                width={"60px"}
                sx={{ cursor: "pointer" }}
              />
            </Stack>
          </Stack>
          <Divider sx={{ border: "1px solid rgba(109, 110, 113, 1)", mb: 4 }} />

          <Stack direction={"row"} gap={10} justifyContent={"space-between"}>
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
                    onClick={() => router.push(item.uri)}
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

          <Divider sx={{ border: "1px solid rgba(109, 110, 113, 1)" }} />
          <Stack alignItems={"flex-end"}>
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
