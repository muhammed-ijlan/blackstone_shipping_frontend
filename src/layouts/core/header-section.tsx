import { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Divider, Stack, useTheme, Link as MuiLink } from "@mui/material";
import { Logo } from "../../components/logo";
import logo from "../../assets/logo/medium.png";
import type { AppBarProps } from "@mui/material/AppBar";
import type { ContainerProps } from "@mui/material/Container";
import type {
  Theme,
  SxProps,
  CSSObject,
  Breakpoint,
} from "@mui/material/styles";
import { useScrollOffsetTop } from "minimal-shared/hooks";
import { mergeClasses } from "minimal-shared/utils";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import { layoutClasses } from "./classes";
import { useLocation } from "react-router-dom";

import searchIcon from "src/assets/icons/search.png";
import trackingIcon from "src/assets/icons/track.png";
import myBBXIcon from "src/assets/icons/box.png";
import contactIcon from "src/assets/icons/mail.png";
import { useRouter } from "src/routes/hooks";

const NavBar = styled("div")(({ theme }) => ({
  display: "flex",
  // flexWrap: "nowrap",
  gap: theme.spacing(3),
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  alignItems: "center",
  overflowX:"auto", 
  maxWidth:"100%"
}));

const NavItem = styled("div", {
  shouldForwardProp: (prop) => prop !== "isLastItem",
})<{ isLastItem?: boolean }>(({ theme, isLastItem }) => ({
  position: "relative",
  display: "inline-block",

}));

const NavLink = styled(MuiLink, {
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive?: boolean }>(({ theme, isActive }) => ({
  fontSize: "15px !important",
  fontWeight: 600,
  cursor: "pointer",
  textWrap:"nowrap",
  color: isActive ? "rgba(45, 55, 72, 1)" : "rgba(109, 110, 113, 1)",
  textDecoration: "none",
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

const SubMenu = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isOpen" && prop !== "isLastItem",
})<{ isOpen: boolean; isLastItem?: boolean }>(
  ({ theme, isOpen, isLastItem }) => ({
    position: "absolute",
    top: "135px",
    left: "0px",
    backgroundColor: "#fff",
    padding: theme.spacing(2, 4),
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? "visible" : "hidden",
    transform: isOpen ? "translateY(10px)" : "translateY(0px)",
    transition: theme.transitions.create(
      ["opacity", "visibility", "transform"],
      {
        duration: theme.transitions.duration.shortest,
        easing: theme.transitions.easing.easeIn,
      }
    ),
    zIndex: 1000,
    width: "100%",
    minWidth: "900px",
    borderTop: `2px solid ${theme.palette.primary.main}`,
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  })
);

const SubMenuContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: theme.spacing(4),
  flexWrap: "wrap",
  padding: theme.spacing(0, 12),
}));

const SubMenuCategory = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(0.5),
  minWidth: "200px",
}));

const SubMenuCategoryTitle = styled(MuiLink)(({ theme }) => ({
  fontSize: 16,
  fontWeight: 700,
  color: "#003087",
  marginBottom: theme.spacing(1),
  textDecoration: "none",
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

const SubMenuItem = styled(MuiLink)(({ theme }) => ({
  fontSize: 14,
  cursor: "pointer",
  color: "#6D6E71",
  lineHeight: "1.5",
  textDecoration: "none",
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

export type HeaderSectionProps = AppBarProps & {
  layoutQuery?: Breakpoint;
  disableOffset?: boolean;
  disableElevation?: boolean;
  slots?: {
    leftArea?: React.ReactNode;
    rightArea?: React.ReactNode;
    topArea?: React.ReactNode;
    centerArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
  slotProps?: {
    container?: ContainerProps;
    centerArea?: React.ComponentProps<"div"> & { sx?: SxProps<Theme> };
  };
  data: MenuItem[];
};

interface MenuItem {
  id: string;
  label: string;
  url: string;
  childItems?: {
    nodes: MenuItem[];
  };
}

export function HeaderSection({
  sx,
  slots,
  slotProps,
  className,
  disableOffset,
  disableElevation,
  layoutQuery = "xl",
  data,
  ...other
}: HeaderSectionProps) {
  const { offsetTop: isOffset } = useScrollOffsetTop();
  const theme = useTheme();
  const router = useRouter();
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const handleMouseEnter = (label: string) => {
    setOpenSubmenu(label);
  };

  const handleMouseLeave = () => {
    setOpenSubmenu(null);
  };

  const renderSubcategories = (subcategories: MenuItem[]) => {
    const hasNestedItems = subcategories.some(
      (subItem) =>
        subItem.childItems?.nodes && subItem.childItems.nodes.length > 0
    );

    if (!hasNestedItems) {
      return (
        <SubMenuContent>
          <SubMenuCategory>
            {subcategories.map((subItem) => (
              <SubMenuItem
                key={subItem.id}
                href={subItem.url !== "#" ? subItem.url : undefined}
              >
                {subItem.label}
              </SubMenuItem>
            ))}
          </SubMenuCategory>
        </SubMenuContent>
      );
    }

    return (
      <SubMenuContent>
        {subcategories.map((category) => (
          <SubMenuCategory key={category.id}>
            <SubMenuCategoryTitle
              href={category.url !== "#" ? category.url : undefined}
            >
              {category.label}
            </SubMenuCategoryTitle>
            {category.childItems?.nodes.map((item) => (
              <SubMenuItem
                key={item.id}
                href={item.url !== "#" ? item.url : undefined}
              >
                {item.label}
              </SubMenuItem>
            ))}
          </SubMenuCategory>
        ))}
      </SubMenuContent>
    );
  };

  return (
    <HeaderRoot
      position="sticky"
      color="default"
      isOffset={isOffset}
      disableOffset={disableOffset}
      disableElevation={disableElevation}
      className={mergeClasses([layoutClasses.header, className])}
      sx={[
        (theme) => ({
          ...(isOffset && {
            "--color": `var(--offset-color, ${theme.vars.palette.text.primary})`,
          }),
          bgcolor: "white",
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {slots?.topArea}

      <HeaderContainer maxWidth="lg">
        {slots?.leftArea}
        <Stack
          width="100%"
          sx={{ [theme.breakpoints.down(layoutQuery)]: { display: "none" } }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ height: "100%" }}
          >
            <Stack>
              <Logo onClick={() => router.push("/")} href={logo} />
            </Stack>

            <Stack gap={1} alignItems="flex-end" sx={{ height: "100%" }}>
              <Box sx={{ display: "flex", gap: 1, ml: "auto" }}>
                <IconButton
                  size="small"
                  sx={{
                    border: "1px solid rgba(109, 110, 113, 0.2)",
                    borderRadius: 1,
                    gap: 0.5,
                    p: "10px 16px",
                  }}
                >
                  <Box component={"img"} width={"16px"} src={searchIcon} />
                  <Typography
                    fontWeight={500}
                    variant="body2"
                    sx={{ ml: 0.5 }}
                    color="rgba(45, 55, 72, 1)"
                    fontSize={14}
                  >
                    Search
                  </Typography>
                </IconButton>

                <IconButton
                  size="small"
                  sx={{
                    border: "1px solid rgba(109, 110, 113, 0.2)",
                    borderRadius: 1,
                    p: "10px 16px",
                    gap: 0.5,
                  }}
                >
                  <Box component={"img"} width={"16px"} src={trackingIcon} />
                  <Typography
                    variant="body2"
                    fontSize={14}
                    fontWeight={500}
                    sx={{ ml: 0.5 }}
                    color="rgba(45, 55, 72, 1)"
                  >
                    Tracking
                  </Typography>
                </IconButton>

                <IconButton
                  size="small"
                  sx={{
                    border: "1px solid rgba(109, 110, 113, 0.2)",
                    borderRadius: 1,
                    p: "10px 16px",
                    gap: 0.5,
                  }}
                >
                  <Box component={"img"} width={"16px"} src={myBBXIcon} />
                  <Typography
                    fontSize={14}
                    fontWeight={500}
                    variant="body2"
                    sx={{ ml: 0.5 }}
                    color="rgba(45, 55, 72, 1)"
                  >
                    My BBX
                  </Typography>
                </IconButton>

                <Button
                  size="small"
                  variant="contained"
                  color="success"
                  sx={{ textTransform: "none", p: "10px 16px" }}
                  startIcon={
                    <Box component={"img"} width={"16px"} src={contactIcon} />
                  }
                >
                  Contact
                </Button>
              </Box>

              <Divider
                sx={{
                  width: "100%",
                  borderBottomWidth: 1,
                  borderColor: "rgba(109, 110, 113, 1)",
                }}
              />

              <NavBar>
                {data.length === 0 ? (
                  <></>
                ) : (
                  data.map((item, index) => (
                    <div
                      key={item.id}
                      style={{ paddingBottom: "15px" }}
                      onMouseEnter={() =>
                        (item?.childItems?.nodes?.length ?? 0) > 0 &&
                        handleMouseEnter(item.label)
                      }
                      onMouseLeave={() =>
                        (item?.childItems?.nodes?.length ?? 0) > 0 &&
                        handleMouseLeave()
                      }
                    >
                      <NavItem isLastItem={index >= data.length - 3}>
                        <NavLink
                          href={item.url !== "#" ? item.url : undefined}
                          isActive={
                            (item.url === "/" || item.url === "") 
                              ? location.pathname === "/"
                              : location.pathname === item.url
                          }
                        >
                          {item.label}
                        </NavLink>
                      </NavItem>
                      {item.childItems?.nodes &&
                        item.childItems.nodes.length > 0 && (
                          <SubMenu
                            isOpen={openSubmenu === item.label}
                            isLastItem={index >= data.length - 2}
                          >
                            {renderSubcategories(item.childItems.nodes)}
                          </SubMenu>
                        )}
                    </div>
                  ))
                )}
              </NavBar>
            </Stack>
          </Stack>
        </Stack>
        {slots?.rightArea}
      </HeaderContainer>
    </HeaderRoot>
  );
}

type HeaderRootProps = Pick<
  HeaderSectionProps,
  "disableOffset" | "disableElevation"
> & {
  isOffset: boolean;
};

const HeaderRoot = styled(AppBar, {
  shouldForwardProp: (prop: string) =>
    !["isOffset", "disableOffset", "disableElevation", "sx"].includes(prop),
})<HeaderRootProps>(({ isOffset, disableOffset, disableElevation, theme }) => {
  const pauseZindex = { top: -1, bottom: -2 };

  const pauseStyles: CSSObject = {
    opacity: 0,
    content: '""',
    visibility: "hidden",
    position: "absolute",
    transition: theme.transitions.create(["opacity", "visibility"], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter,
    }),
  };

  const bgStyles: CSSObject = {
    ...pauseStyles,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: pauseZindex.top,
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)",
    backgroundColor: "white",
    ...(isOffset && {
      opacity: 1,
      visibility: "visible",
    }),
  };

  const shadowStyles: CSSObject = {
    ...pauseStyles,
    left: 0,
    right: 0,
    bottom: 0,
    height: 24,
    margin: "auto",
    borderRadius: "50%",
    width: `calc(100% - 48px)`,
    zIndex: pauseZindex.bottom,
    boxShadow: theme.vars.customShadows.z8,
    ...(isOffset && { opacity: 0.48, visibility: "visible" }),
  };

  return {
    boxShadow: "none",
    zIndex: "var(--layout-header-zIndex)",
    ...(!disableOffset && { "&::before": bgStyles }),
    ...(!disableElevation && { "&::after": shadowStyles }),
  };
});

const HeaderContainer = styled(Container, {
  shouldForwardProp: (prop: string) => !["layoutQuery", "sx"].includes(prop),
})<Pick<HeaderSectionProps, "layoutQuery">>(
  ({ layoutQuery = "lg", theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--color)",
    height: "auto !important",
    padding: theme.spacing(2, 0),
    [theme.breakpoints.up(layoutQuery)]: {
      height: "var(--layout-header-desktop-height)",
    },
    [theme.breakpoints.down(layoutQuery)]: {
      justifyContent: "space-between",
    },
  })
);

const HeaderCenterArea = styled("div")(() => ({
  display: "none",
  flex: "1 1 auto",
  justifyContent: "center",
}));