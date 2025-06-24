import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { RouterLink } from "../../routes/components";

// import { Logo } from './components/logo';

// ----------------------------------------------------------------------

export function NotFoundView() {
  return (
    <>
      {/* <Logo sx={{ position: 'fixed', top: 20, left: 20 }} /> */}

      <Container
        sx={{
          py: 10,
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="h3" sx={{ mb: 2 }}>
          Sorry, page not found!
        </Typography>

        <Typography
          sx={{ color: "text.secondary", maxWidth: 480, textAlign: "center" }}
        >
          Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
          mistyped the URL? Be sure to check your spelling.
        </Typography>

        <Box
          component="img"
          src="/src/assets/logo/navlogo.png"
          sx={{
            width: 150,
            height: "auto",
            my: { xs: 5 },
          }}
        />

        <Button
          component={RouterLink}
          href="/"
          size="large"
          variant="contained"
          color="inherit"
        >
          Go to home
        </Button>
      </Container>
    </>
  );
}
