import { useQuery } from "@apollo/client";
import { Search } from "@mui/icons-material";
import {
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  InputAdornment,
} from "@mui/material";
import React, { useState } from "react";
import PostsByCategory from "src/components/resourses/PostsByCategory";
import { GET_NEWS_CATEGORIES } from "src/graphql/queries";
import { NewsCategoriesData } from "src/types/graphql/types/resourses.types";

const AllNews = () => {
  const { data } = useQuery<NewsCategoriesData>(GET_NEWS_CATEGORIES);
  const [activeCategory, setActiveCategory] = useState<{
    slug: string;
    id: string;
  }>({ slug: "", id: "" });
  const [searchQuery, setSearchQuery] = useState<string>("");

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const handleCategoryClick = (slug: string, id: string) => {
    setActiveCategory({ slug, id });
  };

  return (
    <Container maxWidth="xl">
      <Divider sx={{ my: 6 }} />
      <Stack gap={3}>
        <Typography variant="h2">All News</Typography>

        <Stack
          direction={"row"}
          flexWrap={"wrap"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Stack
            width="100%"
            maxWidth={600}
            mb={{ xs: 3, md: 3 }}
            gap={{ xs: 1, md: 2 }}
            direction="row"
            flexWrap="wrap"
          >
            <CategoryBox
              label="All"
              isActive={activeCategory.slug === ""}
              onClick={() => handleCategoryClick("", "")}
            />

            {data?.categories.nodes.map((item) => (
              <CategoryBox
                key={item.id}
                label={item.name}
                isActive={activeCategory.slug === item.slug}
                onClick={() => handleCategoryClick(item.slug, item.id)}
              />
            ))}
          </Stack>

          <Stack width={{ xs: "100%", sm: "auto" }}>
            <TextField
              name="search"
              placeholder="Search"
              size={isSmall ? "medium" : "small"}
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: "black" }} />
                  </InputAdornment>
                ),
                sx: {
                  backgroundColor: "#fff",
                  borderRadius: "4px",
                  "& fieldset": { borderColor: "black" },
                  "&:hover fieldset": { borderColor: "black" },
                  "&.Mui-focused fieldset": { borderColor: "black" },
                },
              }}
              inputProps={{
                sx: { "&::placeholder": { color: "black", opacity: 1 } },
              }}
            />
          </Stack>
        </Stack>

        <PostsByCategory
          slug={activeCategory.slug}
          catId={activeCategory.slug}
          count={6}
          search={searchQuery}
          isAll={!activeCategory.slug}
        />
      </Stack>
    </Container>
  );
};

interface CategoryBoxProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const CategoryBox = ({ label, isActive, onClick }: CategoryBoxProps) => (
  <Stack
    alignItems="center"
    justifyContent="center"
    onClick={onClick}
    sx={{
      border: "1px solid rgba(109, 110, 113, 0.5)",
      borderRadius: "4px",
      height: 48,
      px: 2,
      cursor: "pointer",
      backgroundColor: isActive ? "rgba(11, 19, 40, 1)" : "transparent",
      color: !isActive ? "rgba(11, 19, 40, 1)" : "white",
      transition: "all 0.3s ease",
      "&:hover": {
        backgroundColor: isActive ? "" : "rgba(109, 110, 113, 0.1)",
      },
    }}
  >
    <Typography variant="body2" fontWeight={600}>
      • &nbsp; {label}
    </Typography>
  </Stack>
);

export default AllNews;
