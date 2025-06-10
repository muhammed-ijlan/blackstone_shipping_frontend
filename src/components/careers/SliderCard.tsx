import { Box, Stack, Typography } from '@mui/material';
import React, { useRef } from 'react';
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-youtube'; 
import VideoJS from '../VideoJs';

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
  const playerRef = useRef<VideoJsPlayer | null>(null);
  const videoUrl = data.peoplesOptions?.videoUrl;
  const thumbnail = data.featuredImage?.node?.sourceUrl;

  const isYouTubeUrl = videoUrl?.includes('youtube.com') || videoUrl?.includes('youtu.be');
  const isSelfHosted = videoUrl?.match(/\.(mp4|webm)$/i);

  const videoJsOptions: VideoJsPlayerOptions = {
    autoplay: false,
    controls: false,
    responsive: true,
    fluid: true,
    loop: true,
    muted: true,
    playsinline: false,
    poster: thumbnail,
    techOrder: isYouTubeUrl ? ['youtube'] : ['html5'],
    sources: videoUrl
      ? [
          {
            src: videoUrl,
            type: isYouTubeUrl ? 'video/youtube' : 'video/mp4',
          },
        ]
      : [],
  };

  const handlePlayerReady = (player: VideoJsPlayer) => {
    playerRef.current = player;

    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };

  return (
    <Stack gap={1}>
      <Box sx={{ width: 400, borderRadius: 2, overflow: 'hidden' }}>
        {videoUrl ? (
          <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
        ) : (
          <Box
            component="img"
            src={thumbnail}
            alt={data.title}
            sx={{
              width: '100%',
              height: 225,
              objectFit: 'cover',
              borderRadius: 2,
            }}
          />
        )}
      </Box>

      <Typography variant="h5" sx={{ textAlign: 'left', textTransform: 'capitalize' }}>
        {data.title}
      </Typography>

      <Box
        component="div"
        sx={{ textAlign: 'left', m: 0, p: 0 }}
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
    </Stack>
  );
};

export default SliderCard;
