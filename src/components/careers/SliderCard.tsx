/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Stack, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";

interface CardData {
  title: string;
  content: string;
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
  peoplesOptions: {
    videoUrl: string;
  };
}

const SliderCard = ({ data }: { data: CardData }) => {
  const ytPlayerRef = useRef<any>(null);
  const videoUrl = data.peoplesOptions?.videoUrl;
  const thumbnail = data.featuredImage?.node?.sourceUrl;
  const [hovered, setHovered] = useState(false);

  const getYouTubeId = (url: string): string | null => {
    if (!url) return null;
    try {
      const parsed = new URL(url);
      if (parsed.hostname.includes("youtu.be")) {
        return parsed.pathname.split("/")[1] || null;
      }
      if (parsed.searchParams.get("v")) {
        return parsed.searchParams.get("v");
      }
      if (parsed.pathname.includes("/shorts/")) {
        return parsed.pathname.split("/shorts/")[1]?.split("?")[0] || null;
      }
    } catch {
      return null;
    }
    return null;
  };

  const videoId = videoUrl ? getYouTubeId(videoUrl) : null;

  const youtubeOpts: YouTubeProps["opts"] = {
    width: "298px",
    height: "531px",
    playerVars: {
      autoplay: 0,
      mute: 0,
      controls: 1,
      modestbranding: 1,
      rel: 0,
      fs: 0,
      iv_load_policy: 3,
      loop: 1,
      playlist: videoId,
      playsinline: 1,
    },
  };

  const handleYouTubeReady: YouTubeProps["onReady"] = (event) => {
    ytPlayerRef.current = event.target;
  };

  const handleMouseEnter = () => {
    setHovered(true);
    if (ytPlayerRef.current) {
      ytPlayerRef.current.playVideo();
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (ytPlayerRef.current) {
      ytPlayerRef.current.pauseVideo();
    }
  };

  return (
    <Stack
      ml={1}
      mt={2}
      gap={1}
      sx={{ width: { xs: 298, md: 298 } }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Box
        sx={{
          width: { xs: 298, md: 298 },
          borderRadius: 2,
          overflow: "hidden",
          height: "531px",
          transform: hovered ? "scale(1.02)" : "scale(1)",
          boxShadow: hovered ? 4 : 1,
          transition: "all 0.3s ease-in-out",
          position: "relative",
        }}
      >
        {videoId && (
          <>
            {!hovered && (
              <Box
                component="img"
                src={thumbnail}
                alt={data.title}
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 2,
                  zIndex: 2,
                }}
              />
            )}

            <YouTube
              videoId={videoId}
              opts={youtubeOpts}
              onReady={handleYouTubeReady}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "16px",
              }}
            />
          </>
        )}
      </Box>

      <Typography
        variant="h5"
        sx={{ textAlign: "left", textTransform: "capitalize" }}
      >
        {data.title}
      </Typography>

      <Box
        component="div"
        sx={{ "& p": { typography: "body1", margin: 0, textWrap: "wrap" } }}
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
    </Stack>
  );
};

export default SliderCard;
