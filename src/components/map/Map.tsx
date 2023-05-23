import "./Map.css";
import {
  MapContainer,
  Marker,
  Polyline,
  TileLayer,
  ZoomControl,
} from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import icon from "../../images/marker-icon.png";
import { useEffect, useMemo, useState } from "react";
import MapView from "../mapView/MapView";
import { getRouteColor } from "../../utils/RouteUtils";

interface MapProps {
  routeCoords: (L.LatLngLiteral | L.LatLngTuple)[];
  centerCoords: LatLngExpression | undefined;
  children: any;
  suggestionRoutesCoordinates: any[];
}

const Map = (props: MapProps) => {
  const { routeCoords, centerCoords, children, suggestionRoutesCoordinates } =
    props;
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const mapHeight = useMemo(() => {
    return windowSize[1] - 45;
  }, [windowSize]);

  const routeLineOptions = {
    color: "red",
    stroke: true,
    weight: 5,
  };

  const suggestionRouteLineOptions = (index: number) => {
    return {
      color: getRouteColor(index),
      stroke: true,
      weight: 5,
    };
  };

  const customIcon = new L.Icon({
    iconUrl: icon,
    iconSize: [25, 35],
    iconAnchor: [12, 33],
  });

  return (
    <div style={{ height: mapHeight, width: windowSize[0] }}>
      <MapContainer
        className="Map"
        center={centerCoords}
        zoom={14}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        {/* <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      /> */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" />
        <Polyline pathOptions={routeLineOptions} positions={routeCoords} />
        {[...suggestionRoutesCoordinates].map((coordinates, index) => (
          <Polyline
            pathOptions={suggestionRouteLineOptions(index)}
            positions={coordinates}
          />
        ))}
        {routeCoords.length > 0 ? (
          <div>
            <Marker position={routeCoords[0]} icon={customIcon}></Marker>
            <Marker
              position={routeCoords[routeCoords.length - 1]}
              icon={customIcon}
            ></Marker>
          </div>
        ) : (
          <></>
        )}
        <MapView centerCoords={centerCoords} />
        {children}
      </MapContainer>
    </div>
  );
};

export default Map;
