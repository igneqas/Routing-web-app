import { LatLngExpression } from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

interface MapViewProps {
  centerCoords: LatLngExpression | undefined;
}

const MapView = (props: MapViewProps) => {
  const { centerCoords } = props;
  let map = useMap();
  useEffect(() => {
    console.log("FSFSD");
    map.setView(centerCoords!, map.getZoom());
  }, [centerCoords]);
  return null;
};

export default MapView;
