import { Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';

interface IndustryItem {
  title: string;
  content: string | null;
  uri: string;
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
  industriesFieldOptions: {
    colorCode: string;
  };
}

const IndustryCoverageCard = ({ item }: { item: IndustryItem }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      // style={{ width: '320px', height: '200px' }}
    >
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal" flipSpeedBackToFront={1} flipSpeedFrontToBack={1}>
        {/* Front Side */}
        <Stack
          px={4}
          py={4}
          gap={2}
          alignItems="flex-start"
          justifyContent="space-between"
          sx={{
            width: '100%',
            height: '218px',
            borderRadius: '8px',
            background: 'linear-gradient(114.75deg, #343D4D 0%, #242E40 100%)',
            position: 'relative',
            borderBottom:"1px solid rgba(249, 250, 251, 1)"
          }}
        >
          <div
            style={{
              width: '5px',
              height: '50px',
              backgroundColor: item.industriesFieldOptions.colorCode,
              position: 'absolute',
              top: '50px',
              left: 0,
              zIndex: 1,
            }}
          />
          <img
            src={item.featuredImage.node.sourceUrl}
            alt={item.title}
            width="60px"
            height="60px"
          />
          <Typography sx={{ fontWeight: 600,
  fontSize: "20px",
  lineHeight: "44px",
  letterSpacing: "3%",}} color="white">
            {item.title}
          </Typography>
        </Stack>

        {/* Back Side */}
        <Stack
          p={3}
          gap={2}
          alignItems="flex-start"
          justifyContent="center"
          sx={{
        width: '100%',
            height: '218px',
            borderRadius: '8px',
            background: 'linear-gradient(114.75deg, #343D4D 0%, #242E40 100%)',
            borderBottom:"1px solid rgba(249, 250, 251, 1)"

          }}
        >
          <Typography variant="body2" color="white">
            {item.content
              ? item.content.replace(/<[^>]+>/g, '')
              : 'No description available.'}
          </Typography>
        </Stack>
      </ReactCardFlip>
    </div>
  );
};

export default IndustryCoverageCard;
