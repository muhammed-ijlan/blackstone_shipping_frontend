import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { RouterLink } from "src/routes/components";

export function ErrorFallbackView({ error }: { error?: Error }) {
    return (
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
            <Typography variant="h3" sx={{ mb: 2 }} color="error">
                Something went wrong.
            </Typography>

            <Typography
                sx={{ color: "text.secondary", maxWidth: 480, textAlign: "center" }}
            >
                An unexpected error occurred while processing your request. Please try
                again or return to the homepage.
            </Typography>

            {error?.message && (
                <Typography
                    sx={{
                        mt: 2,
                        fontSize: 14,
                        fontStyle: "italic",
                        color: "error.main",
                        maxWidth: 500,
                        textAlign: "center",
                        wordBreak: "break-word",
                    }}
                >
                    Error: {error.message}
                </Typography>
            )}

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
                Go to Home
            </Button>
        </Container>
    );
}
