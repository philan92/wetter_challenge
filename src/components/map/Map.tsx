import React, { useState } from "react";
import ReactMapGL, { NavigationControl } from "react-map-gl";
import "./Map.scss";

/** Displays map with weather data
 *
 * @param satFilePath
 * path of sat file
 */
const Map = ({ satFilePath }: { satFilePath: string }) => {
  // Current position in map
  const [viewport, setViewport] = useState({
    latitude: 51.1642292,
    longitude: 10.4541194,
    zoom: 6,
  });

  const minZoom = 6;
  const maxZoom = 14;

  const rasterStyle = {
    version: 8,
    sources: {
      "raster-tiles": {
        type: "raster",
        tiles: [satFilePath],
      },
    },
    layers: [
      {
        id: "simple-tiles",
        type: "raster",
        source: "raster-tiles",
        minzoom: minZoom,
        maxzoom: maxZoom,
      },
    ],
  };

  // Don't render when there is no map file
  if (!satFilePath) return null;

  return (
    <div className="map-area">
      <ReactMapGL
        {...viewport}
        width="100%"
        height="100%"
        minZoom={minZoom}
        maxZoom={maxZoom - 1}
        mapStyle={rasterStyle}
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
