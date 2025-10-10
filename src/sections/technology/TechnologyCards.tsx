/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ScrollToHash from "src/components/ScrollToHash";
import { TechnologyNode } from "src/types/graphql/types/technology.types";

const TechnologyCards = ({ data }: { data: TechnologyNode[] }) => {
  const [decodedHash, setDecodedHash] = useState<string | null>(null);

  const extractDecodedHash = (): string | null => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return null;

    try {
      return atob(hash);
    } catch {
      return hash;
    }
  };

  const extractNumericId = (decoded: string | null): string | null => {
    if (!decoded) return null;
    const match = decoded.match(/\d+/);
    return match ? match[0] : null;
  };

  useEffect(() => {
    const updateHashData = () => {
      const decoded = extractDecodedHash();
      setDecodedHash(decoded);
    };

    updateHashData();
    window.addEventListener("hashchange", updateHashData);
    return () => window.removeEventListener("hashchange", updateHashData);
  }, []);

  return (
    <>
      <ScrollToHash deps={[data, decodedHash]} offset={150} />

      <Stack gap={3} my={5}>
        {data.map((item: any, index: number) => (
          <Stack
            key={index}
            id={item.id}
            sx={{
              width: "100%",
              background: "linear-gradient(360deg, #2D3748 0%, #1A202C 100%)",
              p: { xs: "20px", md: "40px" },
              color: "white",
              borderRadius: "8px",
              borderRight: index === 0 ? "2px solid rgba(255,255,255,0.2)" : "none",
              borderLeft: index === 1 ? "2px solid rgba(255,255,255,0.2)" : "none",
              borderTop: index > 1 ? "2px solid rgba(255,255,255,0.2)" : "none",
            }}
          >
            <Typography variant="h2">{item.title}</Typography>

            <Box
              sx={{
                "& p": { typography: "h5", fontWeight: "500 !important" },
              }}
              dangerouslySetInnerHTML={{ __html: item.content }}
            />

            <Stack>
              <Grid container mt={3} spacing={3}>
                {item.children.nodes.map((child: any, childIndex: number) => (
                  <Grid
                    key={childIndex}
                    size={{ xs: 12, md: 6 }}
                    sx={{
                      py: 3,
                      borderTop: {
                        xs: childIndex > 0 ? "1px solid #414E63" : "none",
                        md: childIndex >= 2 ? "1px solid #414E63" : "none",
                      },
                      borderBottom: {
                        xs:
                          childIndex < item.children.nodes.length - 1
                            ? "1px solid #414E63"
                            : "none",
                        md:
                          childIndex < item.children.nodes.length - 2
                            ? "1px solid #414E63"
                            : "none",
                      },
                    }}
                  >
                    <Stack
                      gap={2}
                      sx={{
                        px: 3,
                        width: "100%",
                        height: "100%",
                        borderLeft: {
                          md: childIndex % 2 === 1 ? "1px solid #414E63" : "none",
                        },
                        borderRight: {
                          md: childIndex % 2 === 0 ? "1px solid #414E63" : "none",
                        },
                        display: "flex",
                        alignItems: "stretch",
                      }}
                    >
                      <Box
                        sx={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "4px",
                          p: 1,
                          background: "white",
                          objectFit: "contain",
                        }}
                        component="img"
                        src={child.featuredImage?.node.sourceUrl}
                        alt={child.title}
                      />
                      <Typography variant="h6">{child.title}</Typography>
                      <Box
                        sx={{
                          "& p": {
                            typography: "body1",
                            fontWeight: "500 !important",
                            m: "0",
                          },
                          "& ul": { listStyle: "none", pl: 0, mt: 2 },
                          "& li": {
                            position: "relative",
                            pl: 3,
                            mt: 2,
                            "&::before": {
                              content: '""',
                              position: "absolute",
                              left: 0,
                              top: "0.6em",
                              width: "14px",
                              height: "14px",
                              borderRadius: "50%",
                              border: "3px solid white",
                              backgroundColor: "#2563EB",
                            },
                          },
                          "& strong": {
                            display: "unset !important",
                            fontWeight: "700 !important",
                            fontSize: "1rem",
                            mb: "2px",
                          },
                        }}
                        dangerouslySetInnerHTML={{
                          __html: child.content,
                        }}
                      />
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </>
  );
};

export default TechnologyCards;
