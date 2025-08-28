import { Box, useTheme } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js';
import 'video.js/dist/video-js.css';

interface VideoJSProps {
  options: VideoJsPlayerOptions;
  onReady?: (player: VideoJsPlayer) => void;
}

export const VideoJS: React.FC<VideoJSProps> = ({ options, onReady }) => {
  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<VideoJsPlayer | null>(null);
  const theme = useTheme();

  useEffect(() => {
    if (!playerRef.current && videoRef.current) {
      const videoElement = document.createElement('video-js');
      videoElement.classList.add('vjs-big-play-centered');
      videoElement.setAttribute('playsinline', '');

      if (videoRef.current.children.length === 0) {
        videoRef.current.appendChild(videoElement);
      }

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log('player is ready');
        if (onReady) {
          onReady(player);
        }
      }));
    } else if (playerRef.current) {
      const player = playerRef.current;
      player.autoplay(options.autoplay ?? false);
      player.src(options.sources ?? []);
    }
  }, [options, onReady]);

  useEffect(() => {
    const player = playerRef.current;
    return () => {
      if (player && typeof player.dispose === 'function') {
        player.dispose();
        playerRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.innerHTML = '';
      } else if (playerRef.current) {
        const player = playerRef.current;
        if (options.sources && options.sources.length > 0 && options.sources[0].src) {
          player.src(options.sources);
        }
        player.autoplay(options.autoplay ?? false);
      }
    };
  }, []);

  return (
    <Box
      component="div"
      data-vjs-player
      sx={{
        borderRadius: 0,
        overflow: 'hidden',
        [theme.breakpoints.down('sm')]: {
          borderRadius: '5px',
        },
      }}
    >
      <div ref={videoRef} />
    </Box>
  );
};

export default VideoJS;
