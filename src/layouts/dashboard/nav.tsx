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
  Typography,
} from "@mui/material";

import { usePathname } from "../../routes/hooks";
import { RouterLink } from "../../routes/components";
import { Scrollbar } from "../../components/scrollbar";
import { Logo } from "../../components/logo";
import { Iconify } from "src/components/iconify";

import logo from "../../assets/logo/navlogo.png";
import type { WorkspacesPopoverProps } from "../components/workspaces-popover";
import { varAlpha } from "minimal-shared/utils";

export type NavContentProps = {
  data: {
    title: string;
    subcategories: {
      category: string;
      items: { text: string; link: string }[];
    }[];
  }[];
  slots?: {
    topArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
  workspaces: WorkspacesPopoverProps["data"];
  sx?: SxProps<Theme>;
};

// ----------------------------------------------------------------------

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

// ----------------------------------------------------------------------

export function NavContent({
  data,
  slots,
  workspaces,
  sx,
  onClose,
}: NavContentProps & { onClose: () => void }) {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const handleToggle = (title: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const navItems = [
    { title: "Home", subcategories: [] },
    {
      title: "Company",
      subcategories: [
        {
          category: "About Us",
          items: [
            { text: "Purpose", link: "/company/about-us/purpose" },
            { text: "Vision", link: "/company/about-us/vision" },
            { text: "Key Facts & Figures (At A Glance)", link: "/company/about-us/key-facts" },
          ],
        },
        {
          category: "Our Team",
          items: [
            { text: "Leadership", link: "/company/our-team/leadership" },
          ],
        },
        {
          category: "Our Network",
          items: [
            { text: "Interactive Map", link: "/company/our-network/interactive-map" },
            { text: "Global Locations", link: "/company/our-network/global-locations" },
          ],
        },
        {
          category: "Certifications & Partnerships",
          items: [
            { text: "Industry Certifications", link: "/company/certifications/industry" },
            { text: "Strategic Alliances", link: "/company/certifications/alliances" },
          ],
        },
      ],
    },
    {
      title: "Services",
      subcategories: [
        {
          category: "Ocean Freight",
          items: [
            { text: "Full Container Load (FCL)", link: "/services/ocean-freight/fcl" },
            { text: "Less Than Container Load (LCL)", link: "/services/ocean-freight/lcl" },
            { text: "Breakbulk & Ro-Ro", link: "/services/ocean-freight/breakbulk-ro-ro" },
          ],
        },
        {
          category: "Air Freight",
          items: [
            { text: "Express Services", link: "/services/air-freight/express" },
            { text: "Charter Services", link: "/services/air-freight/charter" },
            { text: "Temperature-Controlled", link: "/services/air-freight/temperature-controlled" },
          ],
        },
        {
          category: "Door To Door Shipments",
          items: [
            { text: "Trucking, Barge & Rail Distribution", link: "/services/door-to-door/trucking" },
            { text: "First-Mile Transport", link: "/services/door-to-door/first-mile" },
            { text: "Last-Mile Delivery", link: "/services/door-to-door/last-mile" },
          ],
        },
        {
          category: "Warehousing & Distribution",
          items: [
            { text: "Storage Solutions", link: "/services/warehousing/storage" },
            { text: "Inventory Management", link: "/services/warehousing/inventory" },
            { text: "Order Fulfillment", link: "/services/warehousing/fulfillment" },
            { text: "Cross-Docking", link: "/services/warehousing/cross-docking" },
          ],
        },
        {
          category: "Customs Brokerage Consultancy",
          items: [
            { text: "Heavy Lift & Oversized", link: "/services/customs/heavy-lift" },
            { text: "Turnkey Projects", link: "/services/customs/turnkey-projects" },
            { text: "Route Planning", link: "/services/customs/route-planning" },
          ],
        },
        {
          category: "IT Enabled Logistics",
          items: [
            { text: "Import/Export Clearance", link: "/services/it-logistics/clearance" },
            { text: "Compliance & Documentation", link: "/services/it-logistics/compliance" },
            { text: "Duty Management", link: "/services/it-logistics/duty-management" },
          ],
        },
        {
          category: "Sustainable Logistics",
          items: [
            { text: "Integrated Solutions", link: "/services/sustainable/integrated" },
            { text: "Cost-Effective Options", link: "/services/sustainable/cost-effective" },
          ],
        },
      ],
    },
    {
      title: "Solutions",
      subcategories: [
        {
          category: "Ocean Freight",
          items: [
            { text: "Full Container Load (FCL)", link: "/solutions/ocean-freight/fcl" },
            { text: "Less Than Container Load (LCL)", link: "/solutions/ocean-freight/lcl" },
            { text: "Breakbulk & Ro-Ro", link: "/solutions/ocean-freight/breakbulk-ro-ro" },
          ],
        },
        {
          category: "Air Freight",
          items: [
            { text: "Express Services", link: "/solutions/air-freight/express" },
            { text: "Charter Services", link: "/solutions/air-freight/charter" },
            { text: "Temperature-Controlled", link: "/solutions/air-freight/temperature-controlled" },
          ],
        },
        {
          category: "Door To Door Shipments",
          items: [
            { text: "Trucking, Barge & Rail Distribution", link: "/solutions/door-to-door/trucking" },
            { text: "First-Mile Transport", link: "/solutions/door-to-door/first-mile" },
            { text: "Last-Mile Delivery", link: "/solutions/door-to-door/last-mile" },
          ],
        },
        {
          category: "Warehousing & Distribution",
          items: [
            { text: "Storage Solutions", link: "/solutions/warehousing/storage" },
            { text: "Inventory Management", link: "/solutions/warehousing/inventory" },
            { text: "Order Fulfillment", link: "/solutions/warehousing/fulfillment" },
            { text: "Cross-Docking", link: "/solutions/warehousing/cross-docking" },
          ],
        },
        {
          category: "Customs Brokerage Consultancy",
          items: [
            { text: "Heavy Lift & Oversized", link: "/solutions/customs/heavy-lift" },
            { text: "Turnkey Projects", link: "/solutions/customs/turnkey-projects" },
            { text: "Route Planning", link: "/solutions/customs/route-planning" },
          ],
        },
        {
          category: "IT Enabled Logistics",
          items: [
            { text: "Import/Export Clearance", link: "/solutions/it-logistics/clearance" },
            { text: "Compliance & Documentation", link: "/solutions/it-logistics/compliance" },
            { text: "Duty Management", link: "/solutions/it-logistics/duty-management" },
          ],
        },
        {
          category: "Sustainable Logistics",
          items: [
            { text: "Integrated Solutions", link: "/solutions/sustainable/integrated" },
            { text: "Cost-Effective Options", link: "/solutions/sustainable/cost-effective" },
          ],
        },
      ],
    },
    {
      title: "Technology",
      subcategories: [
        {
          category: "",
          items: [
            { text: "Tracking System", link: "/technology/tracking-system" },
            { text: "Automation", link: "/technology/automation" },
            { text: "AI Solutions", link: "/technology/ai-solutions" },
            { text: "Data Analytics", link: "/technology/data-analytics" },
          ],
        },
      ],
    },
    {
      title: "Quality & Sustainability",
      subcategories: [
        {
          category: "",
          items: [
            { text: "Certifications", link: "/quality-sustainability/certifications" },
            { text: "Green Logistics", link: "/quality-sustainability/green-logistics" },
            { text: "Safety Standards", link: "/quality-sustainability/safety-standards" },
            { text: "Compliance", link: "/quality-sustainability/compliance" },
          ],
        },
      ],
    },
    {
      title: "Careers",
      subcategories: [
        {
          category: "",
          items: [
            { text: "Job Openings", link: "/careers/job-openings" },
            { text: "Benefits", link: "/careers/benefits" },
            { text: "Culture", link: "/careers/culture" },
            { text: "Apply Now", link: "/careers/apply-now" },
          ],
        },
      ],
    },
    {
      title: "Support",
      subcategories: [
        {
          category: "",
          items: [
            { text: "FAQ", link: "/support/faq" },
            { text: "Customer Service", link: "/support/customer-service" },
            { text: "Technical Support", link: "/support/technical-support" },
            { text: "Feedback", link: "/support/feedback" },
          ],
        },
      ],
    },
    {
      title: "My Blackbox Freight",
      subcategories: [
        {
          category: "",
          items: [
            { text: "Dashboard", link: "/my-blackbox-freight/dashboard" },
            { text: "Shipments", link: "/my-blackbox-freight/shipments" },
            { text: "Invoices", link: "/my-blackbox-freight/invoices" },
            { text: "Settings", link: "/my-blackbox-freight/settings" },
          ],
        },
      ],
    },
    {
      title: "Resources",
      subcategories: [
        {
          category: "",
          items: [
            { text: "Blog", link: "/resources/blog" },
            { text: "Whitepapers", link: "/resources/whitepapers" },
            { text: "Guides", link: "/resources/guides" },
            { text: "Case Studies", link: "/resources/case-studies" },
          ],
        },
      ],
    },
  ];

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Logo href={logo} sx={{ width: "100px" }} />
        <Iconify
          width={30}
          icon="ic:round-close"
          onClick={onClose}
          sx={{ color: "rgba(45, 55, 72, 1)", cursor: "pointer" }}
        />
      </Stack>

      {slots?.topArea}

      <Scrollbar fillContent >
        <Box
          component="nav"
          sx={[
            {
              display: "flex",
              flex: "1 1 auto",
              height:"100vh",
              flexDirection: "column",
            },
            ...(Array.isArray(sx) ? sx : [sx]),
          ]}
        >
          <List sx={{ p: 0, m: 0 }}>
            {navItems.map((item) => {
              const isActive = item.subcategories.some((sub) =>
                sub.items.some((subItem) => subItem.link === pathname)
              );
              const hasSubcategories = item.subcategories && item.subcategories.length > 0;

              return (
                <Box key={item.title}>
                  <ListItem disableGutters disablePadding>
                    <ListItemButton
                      onClick={() => hasSubcategories && handleToggle(item.title)}
                      disableGutters
                      sx={(theme) => ({
                        pl: 2,
                        py: 1,
                        pr: 1.5,
                        gap: 2,
                        borderRadius: 0.75,
                        typography: "body2",
                        fontWeight: "fontWeightMedium",
                        color: "#005B99",
                        minHeight: 44,
                        ...(isActive && {
                          fontWeight: "fontWeightSemiBold",
                          color: "#005B99",
                          bgcolor: varAlpha(theme.vars.palette.primary.mainChannel, 0.08),
                          "&:hover": {
                            bgcolor: varAlpha(theme.vars.palette.primary.mainChannel, 0.16),
                          },
                        }),
                      })}
                    >
                      <Box component="span" sx={{ flexGrow: 1 }}>
                        {item.title}
                      </Box>
                      {hasSubcategories && (
                        <Iconify
                          icon={openSections[item.title] ? "ic:round-keyboard-arrow-down" : "ic:round-keyboard-arrow-right"}
                          sx={{ color: "#005B99" }}
                        />
                      )}
                    </ListItemButton>
                  </ListItem>

                  {hasSubcategories && (
                    <Collapse in={openSections[item.title]} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {item.subcategories.map((subcategory, subIndex) => (
                          <Box key={subIndex}>
                            {subcategory.category && (
                              <ListItem sx={{ pl: 4, py: 0.5 }}>
                                <Typography variant="caption" sx={{ fontWeight: "bold", color: "#005B99" }}>
                                  {subcategory.category}
                                </Typography>
                              </ListItem>
                            )}
                            {subcategory.items.map((subItem, itemIndex) => (
                              <ListItem key={itemIndex} disableGutters disablePadding>
                                <ListItemButton
                                  component={RouterLink}
                                  href={subItem.link}
                                  sx={{
                                    pl: subcategory.category ? 6 : 4,
                                    py: 0.5,
                                    color: "#005B99",
                                    typography: "body2",
                                    "&:hover": { bgcolor: "rgba(0, 91, 153, 0.08)" },
                                    ...(subItem.link === pathname && {
                                      fontWeight: "fontWeightSemiBold",
                                      bgcolor: "rgba(0, 91, 153, 0.08)",
                                    }),
                                  }}
                                >
                                  {subItem.text}
                                </ListItemButton>
                              </ListItem>
                            ))}
                          </Box>
                        ))}
                      </List>
                    </Collapse>
                  )}
                </Box>
              );
            })}
          </List>
        </Box>
      </Scrollbar>

      {slots?.bottomArea}
    </>
  );
}