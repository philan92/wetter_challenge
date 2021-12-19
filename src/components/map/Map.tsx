import React, { useState } from "react";
import ReactMapGL, { NavigationControl } from "react-map-gl";
import env from 'react-dotenv'
import "./Map.scss";



const Map = () => {
  
  // State
  const [viewport, setViewport] = useState({
    latitude: 51.1642292,
    longitude: 10.4541194,
    zoom: 6,
  });

  // Render
  return (
    <div className="map-area">
      <ReactMapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        mapboxApiAccessToken={env.MAPBOX_API_TOKEN}
        onViewportChange={(nextViewport: React.SetStateAction<any>) =>
          setViewport(nextViewport)
        }
      >
        <NavigationControl
          style={{
            right: 10,
            top: 10,
          }}
        />
      
      </ReactMapGL>
    </div>
  );
};

export default Map;
