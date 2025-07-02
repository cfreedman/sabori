import Map from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

import { mapTilerKey } from "./config/config";

function MapComponent() {
  return (
    <Map
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14,
      }}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${mapTilerKey}`}
    />
  );
}

export default MapComponent;
