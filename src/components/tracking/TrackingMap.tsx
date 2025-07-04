import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface TrackingMapProps {
  containerNo?: string; // Optional prop to pass container number
}

const TrackingMap: React.FC<TrackingMapProps> = ({ containerNo }) => {
  const [mapUrl, setMapUrl] = useState<string>('about:blank');
  const [isMapVisible, setIsMapVisible] = useState<boolean>(false);

  const fetchMapData = async (containerNumber: string) => {
    try {
      const response = await axios.get(
        `https://api.blackstoneshipping.com/master-api/Tracking/Enquiry_02?pType=5&pContainerNo=${containerNumber}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer vxSId2W1NCzz2BSiqGNKl4rMMyxUTE',
            appid: 'bss_api_web',
            keyid: '5Q1AyHOCzfWBfyA',
          },
        }
      );

      const trackingUrl = response.data.result.Table?.[0]?.TrackingURL;
      if (trackingUrl) {
        setMapUrl(trackingUrl);
        setIsMapVisible(true);
      } else {
        setMapUrl('about:blank');
        setIsMapVisible(false);
      }
    } catch (err) {
      console.error('Map tracking error:', err);
      setMapUrl('about:blank');
      setIsMapVisible(false);
    }
  };

  useEffect(() => {
    if (containerNo) {
      fetchMapData(containerNo);
    }
  }, [containerNo]);

  return (
    <div>
      {isMapVisible && (
        <iframe
          id="ifrmurl"
          src={mapUrl}
          width="100%"
          height="450"
          frameBorder="0"
          scrolling="no"
          style={{ visibility: isMapVisible ? 'visible' : 'hidden' }}
        ></iframe>
      )}
    </div>
  );
};

export default TrackingMap;