import { Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';

const IndustryCoverageCard = ({ item }: { item: { icon: string; title: string;subTitle?:string; } }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      style={{ width: '359px', height: '218px' }}
    >
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        {/* Front Side */}
        <Stack
          p={3}
          gap={3}
          alignItems="flex-start"
          justifyContent="center"
          sx={{
            width: '320px',
            height: '200px',
            borderRadius: '8px',
            borderBottomWidth: '1px',
            background: 'linear-gradient(114.75deg,#343D4D 0%, #242E40 100%)',
          }}
          position="relative"
        >
          <div
            style={{
              width: '5px',
              height: '50px',
              backgroundColor: 'red',
              position: 'absolute',
              top: '50px',
              left: 0,
              zIndex: 999,
            }}
          />
          <img src={item.icon} width="55px" height="55px" />
          <Typography variant="h4" fontWeight={600}>
            {item.title}
          </Typography>
        </Stack>

        {/* Back Side */}
        <Stack

          p={3}
          gap={3}
          alignItems="flex-start"
          justifyContent="center"
          sx={{
           width: '320px',
            height: '200px',
            borderRadius: '8px',
            borderBottomWidth: '1px',
            background: 'linear-gradient(114.75deg,#343D4D 0%, #242E40 100%)',
          }}
        >
        
          <Typography variant="body1" textAlign={"left"} fontWeight={600}>
            {item.subTitle}
          </Typography>
        </Stack>
      </ReactCardFlip>
    </div>
  );
};

export default IndustryCoverageCard;
