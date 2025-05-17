
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
      videoRef.current.appendChild(videoElement);

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
  }, [options]);

 React.useEffect(() => {
  const player = playerRef.current;

  return () => {
    // Fix: check if player.dispose exists and is a function
    if (player && typeof player.dispose === 'function') {
      player.dispose();
      playerRef.current = null;
    }
  };
}, []);


  return (
    <Box component={"div"} data-vjs-player style={{ [theme.breakpoints.down('sm')]:{borderRadius:"5px"}, overflow: 'hidden'}}>
      <div ref={videoRef} />
    </Box>
  );
};

export default VideoJS;
