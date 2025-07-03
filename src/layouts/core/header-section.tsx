import { useState, useRef } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import {
  Divider,
  Stack,
  useTheme,
  Link as MuiLink,
  LinearProgress,
} from "@mui/material";
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
import { MenuItem } from "src/types/graphql/types/menu.types";

const NavBar = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "nowrap",
  gap: theme.spacing(2),
  [theme.breakpoints.up("xl")]: {
    gap: theme.spacing(3.5),
  },
  [theme.breakpoints.only("lg")]: {
    gap: theme.spacing(3.5),
  },
  // paddingTop: theme.spacing(1),
  // paddingBottom: theme.spacing(1),
  alignItems: "center",
  maxWidth: "100%",
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
  fontSize: "16px !important",
  fontWeight: 600,
  lineHeight:"100%",
  letterSpacing:"3%",
  cursor: "pointer",
  textWrap: "nowrap",
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
    top: "105px",
    left: "0px",
    backgroundColor: "#fff",
    padding: "0 10px 40px 10px",
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
    zIndex: 10000,
    width: "100%",
    minWidth: "900px",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  })
);

const SubMenuContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: theme.spacing(1.5),
  // flexWrap: "wrap",
  // padding: theme.spacing(0, 12),
}));

const SubMenuCategory = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(0.5),
  // minWidth: "200px",
  borderRight: `1px solid ${theme.palette.divider}`,
  paddingRight: theme.spacing(2),
  "&:last-of-type": {
    borderRight: "none",
    paddingRight: 0,
  },
}));

const SubMenuCategoryTitle = styled(MuiLink)(({ theme }) => ({
  fontSize: 16,
  fontWeight: 700,
  color: "rgba(26, 86, 219, 1)",
  marginBottom: theme.spacing(1),
  textDecoration: "none",
  "&:hover": {
    color: theme.palette.primary.main,
  },
  cursor: "pointer",
}));

const SubMenuItem = styled(MuiLink)(({ theme }) => ({
  fontSize: 14,
  fontWeight:"600",
  cursor: "pointer",
  color: "rgba(45, 55, 72, 1)",
  lineHeight: "1.5",
  textDecoration: "none",
  "&:hover": {
    color: theme.palette.primary.main,
  },
  marginTop: 6,
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
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (label: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setOpenSubmenu(label);
    }, 200);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setOpenSubmenu(null);
    }, 200);
  };

  const renderSubcategories = (subcategories: MenuItem[]) => {
    const hasNestedItems = subcategories.some(
      (subItem) => subItem.children && subItem.children.length > 0
    );

    if (!hasNestedItems) {
      return (
        <Stack>
          <Divider
            sx={{
              width: "100%",
              borderBottomWidth: 1,
              borderColor: "rgba(45, 55, 72, 1)",
              mb: 3,
            pt:2,
            }}
          />

          <SubMenuContent>
            <SubMenuCategory>
              {subcategories.map((subItem) => (
                <SubMenuItem
                  key={subItem.id}
                  href={subItem.uri !== "#" ? subItem.uri : undefined}
                  onClick={() =>
                    subItem.uri !== "#" && router.push(subItem.uri)
                  }
                >
                  {subItem.label}
                </SubMenuItem>
              ))}
            </SubMenuCategory>
          </SubMenuContent>
        </Stack>
      );
    }

    return (
      <Stack>
        <Divider
          sx={{
            width: "100%",
            borderBottomWidth: 1,
            borderColor: "rgba(45, 55, 72, 1)",
            mb: 3,
            pt:2,
          }}
        />
        <SubMenuContent>
          {subcategories.map((category) => (
            <SubMenuCategory key={category.id}>
              <SubMenuCategoryTitle
                // href={category.uri !== "#" ? category.uri : undefined}
                onClick={() => {
                  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                  category.uri !== "#" && router.push(category.uri);
                  handleMouseLeave();
                }}
              >
                {category.label}
              </SubMenuCategoryTitle>
              {category.children?.map((item) => (
                <SubMenuItem
                  key={item.id}
                  // href={item.uri !== "#" ? item.uri : undefined}
                  onClick={() => {
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    item.uri !== "#" && router.push(item.uri);
                    handleMouseLeave();
                  }}
                >
                  {item.label}
                </SubMenuItem>
              ))}
            </SubMenuCategory>
          ))}
        </SubMenuContent>
      </Stack>
    );
  };
  
  const normalizePath = (path: string = "") => {
    if (!path) return "";
    return path.replace(/\/+$/, "").toLowerCase();
  };

  const isNavItemActive = (item: MenuItem, currentPath: string): boolean => {
    const normalizedCurrent = normalizePath(currentPath);
    const normalizedItem = normalizePath(item.uri);

    // Direct match
    if (normalizedCurrent === normalizedItem) return true;

    // Special handling for parent-child sections
    const childPrefixes = CHILD_URI_GROUPS[normalizedItem];
    if (childPrefixes) {
      return childPrefixes.some((prefix) =>
        normalizedCurrent.startsWith(prefix)
      );
    }

    return false;
  };

  const CHILD_URI_GROUPS: Record<string, string[]> = {
    "/services": ["/service"],
    "/solutions": ["/solution"],
    "/technology": ["/technology"],
    "/careers": ["/careers"],
    "/resources": ["/resources/news", "/resources/case-study"],
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

            <Stack gap={1} alignItems="flex-end" mr={{xs:"0px",lg:"55px"}}>
              <Box sx={{ display: "flex", gap: 1, ml: "auto" }}>
                <IconButton
                  size="small"
                  sx={{
                    border: "1px solid rgba(109, 110, 113, 0.2)",
                    borderRadius: 1,
                    gap: 0.5,
                    p: "10px 16px",
                  }}
                  onClick={() => router.push("/search")}
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
                  onClick={() => router.push("/tracking")}
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
                  onClick={() => router.push("/support")}
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
                  marginBottom:"5px",
                  width: "100%",
                  borderBottomWidth: 1,
                  borderColor: "rgba(109, 110, 113, 1)",
                  color:"rgba(109, 110, 113, 1)"
                }}
              />

              <NavBar>
                {data.length === 0 ? (
                  <>loading..</>
                ) : (
                  data.map((item, index) => (
                    <div
                      key={item.id}
                      style={{ paddingBottom: "0" }}
                      onMouseEnter={() =>
                        item.children &&
                        item.children.length > 0 &&
                        handleMouseEnter(item.label)
                      }
                      onMouseLeave={() =>
                        item.children &&
                        item.children.length > 0 &&
                        handleMouseLeave()
                      }
                    >
                      <NavItem isLastItem={index >= data.length - 3}>
                        <NavLink
                          // href={item.uri !== "#" ? item.uri : undefined}
                          onClick={() => {
                            handleMouseLeave();
                            router.push(item.uri);
                          }}
                          isActive={isNavItemActive(item, location.pathname)}
                        >
                          {item.label}
                        </NavLink>
                      </NavItem>
                      {item.children && item.children.length > 0 && (
                        <SubMenu
                          isOpen={openSubmenu === item.label}
                          isLastItem={index >= data.length - 2}
                        >
                          <Container maxWidth="xl">
                            {renderSubcategories(item.children)}
                          </Container>
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
    height: "127px !important",
    [theme.breakpoints.down("md")]: {
      height: "100px !important",
    },
    padding: theme.spacing(2, 0), 

    // Override padding for medium (md) and up
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(0, 0),
    },

    [theme.breakpoints.up(layoutQuery)]: {},
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
