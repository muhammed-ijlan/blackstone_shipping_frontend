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

const Footer = () => {
  const data = [
    { item: 1, items: [1, 4, 4, 4, 4, 4] },
    { item: 1, items: [1, 4, 4, 4, 4, 4] },
    { item: 1, items: [1, 4, 4, 4, 4, 4] },
    { item: 1, items: [1, 4, 4, 4, 4, 4] },
    { item: 1, items: [1, 4, 4, 4, 4, 4] },
    { item: 1, items: [1, 4, 4, 4, 4, 4] },
  ];

  const currentYear = new Date().getFullYear();
  return (
    <Stack color={"white"} sx={{ background: "rgba(26, 32, 44, 1)" }}>
      <Container maxWidth="lg" sx={{ p: 3 }}>
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
          <Divider sx={{ border: "1px solid rgba(109, 110, 113, 1)" }} />

          <Stack direction={"row"} gap={10}>
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
            <Stack gap={2} height={"400px"} flexWrap={"wrap"}>
              {data.map((item, idx) => (
                <React.Fragment key={idx}>
                  <Typography
                    variant="body2"
                    color="rgba(249, 250, 251, 0.6)"
                    sx={{ textDecoration:"underline", }}
                    
                  >
                    Services
                  </Typography>
                  {item.items.map((subItem, subIdx) => (
                    <Typography
                      key={subIdx}
                      variant="body2"
                      color="white"
                      sx={{ pl: 2 }}
                    >
                      Sub-service test test {subItem}
                    </Typography>
                  ))}
                </React.Fragment>
              ))}
            </Stack>
          </Stack>

          <Divider sx={{ border: "1px solid rgba(109, 110, 113, 1)" }} />
          <Stack alignItems={"flex-end"}>
            <Typography
              variant="subtitle1"
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
