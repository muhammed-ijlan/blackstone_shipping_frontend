import { Search } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";

import expand from "src/assets/icons/expand.png";
import collapse from "src/assets/icons/collapse.png";

const SEARCH_FAQS = gql`
  query SearchFAQs($search: String!) {
    faqs(where: { search: $search }) {
      nodes {
        title
        content
      }
    }
  }
`;

interface FaqNode {
  title: string;
  content: string;
}

interface FaqsData {
  faqs: {
    nodes: FaqNode[];
  };
}

const FaqSection = () => {
  const [expanded, setExpanded] = useState<number | false>(0);

  const [searchTerm, setSearchTerm] = useState("");

  const [fetchFaqs, { loading, data }] = useLazyQuery<FaqsData>(SEARCH_FAQS, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      fetchFaqs({ variables: { search: searchTerm } });
    }
  }, [searchTerm, fetchFaqs]);

  const handleChange =
    (index: number) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? index : false);
    };

  const faqs = data?.faqs.nodes ?? [];

  return (
    <Container maxWidth="xl" sx={{ my: 5 }}>
      <Stack gap={3}>
        <Typography variant="h2">FAQ</Typography>
        <TextField
          sx={{ width:{xs:"100%",md: "400px"} }}
          name="search"
          placeholder="Search"
          size="small"
          variant="outlined"
          value={searchTerm.trim() === " " ? "" : searchTerm} // Show empty input if single space
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: "black" }} />
              </InputAdornment>
            ),
            sx: {
              backgroundColor: "#fff",
              borderRadius: "4px",
              "& fieldset": {
                borderColor: "black",
              },
              "&:hover fieldset": {
                borderColor: "black",
              },
              "&.Mui-focused fieldset": {
                borderColor: "black",
              },
            },
          }}
          inputProps={{
            sx: {
              "&::placeholder": {
                color: "black",
                opacity: 1,
              },
            },
          }}
        />

        <Box>
          {loading && <Typography>Loading FAQs...</Typography>}
          {!loading && faqs.length === 0 && (
            <Typography>No FAQs found for "{searchTerm.trim()}"</Typography>
          )}
          {!loading &&
            faqs.map((faq, index) => {
              const isActive = expanded === index;
              return (
                <Accordion
                  key={index}
                  expanded={isActive}
                  onChange={handleChange(index)}
                  disableGutters
                  sx={{
                    boxShadow: "none",
                    backgroundColor: "transparent",
                    borderTop: "1px solid",
                    borderTopColor: isActive ? "#000" : "#E2E8F0",
                    borderBottom: isActive ? "1px solid #000" : "none",
                    borderRadius: "0 !important",
                    margin: 0,
                    "&:before": { display: "none" },
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <Box
                        component="img"
                        src={expanded === index ? collapse : expand}
                        alt="toggle icon"
                        sx={{
                          width: 24,
                          height: 24,
                          transition: "transform 0.2s ease-in-out",
                        }}
                      />
                    }
                    sx={{ padding: "22px 0px", minHeight: "unset" }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: "20px !important",
                        color: isActive ? "#2D3748" : "#4A5568",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      • &nbsp;{faq.title}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ padding: "0px 0px 16px 22px" }}>
                    <Typography
                      component="div"
                      sx={{ fontSize: "16px", color: "rgba(45, 55, 72, 1)" }}
                      dangerouslySetInnerHTML={{ __html: faq.content }}
                    />
                  </AccordionDetails>
                </Accordion>
              );
            })}
        </Box>
      </Stack>
    </Container>
  );
};

export default FaqSection;
