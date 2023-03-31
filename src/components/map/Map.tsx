import "./Map.css";
import {
  MapContainer,
  Marker,
  Polyline,
  TileLayer,
  useMap,
} from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import icon from "../../images/marker-icon.png";
import { CoordsObject } from "../../App";
import { useEffect, useState } from "react";

interface MapProps {
  startPoint: CoordsObject | undefined;
  finishPoint: CoordsObject | undefined;
  centerCoords: LatLngExpression | undefined;
}

const Map = (props: MapProps) => {
  const { startPoint, finishPoint, centerCoords } = props;

  const [routeCoords, setRouteCoords] = useState<
    (L.LatLngLiteral | L.LatLngTuple)[]
  >([]);

  const routeLineOptions = {
    color: "red",
    stroke: true,
    weight: 5,
  };

  useEffect(() => {
    const getRouteCoordinates = async () => {
      if (startPoint && finishPoint) {
        const url = `http://localhost:17777/brouter?lonlats=${startPoint?.longitude},${startPoint?.latitude}|${finishPoint?.longitude},${finishPoint?.latitude}&nogos=&profile=shortest&alternativeidx=0&format=geojson`;
        const response = await fetch(url, {
          method: "GET",
        });
        const routeJson = await response.json();
        const routeCoordinates = routeJson.features[0].geometry.coordinates;
        console.log(routeCoordinates);
        let x = [];
        for (var i = 0; i < routeCoordinates.length; i++) {
          x.push([
            routeCoordinates[i][1],
            routeCoordinates[i][0],
          ] as LatLngExpression);
        }
        console.log(x);
        setRouteCoords(x);
      }
    };
    getRouteCoordinates();
  }, [startPoint, finishPoint]);

  const customIcon = new L.Icon({
    iconUrl: icon,
    iconSize: [25, 35],
    iconAnchor: [12, 33],
  });

  const MapView = () => {
    let map = useMap();
    map.setView(centerCoords!, map.getZoom());
    return null;
  };

  console.log(routeCoords);

  return (
    <MapContainer
      className="Map"
      center={centerCoords}
      zoom={14}
      scrollWheelZoom={true}
    >
      {/* <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      /> */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
      />
      <Polyline pathOptions={routeLineOptions} positions={routeCoords} />
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
      <MapView />
    </MapContainer>
  );
  /* <MapContainer center={center} zoom={15} minZoom={0} id="mapid">
<LayersControl position={"bottomright"}>
  <LayersControl.BaseLayer checked name="Base Layer">
    <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
  </LayersControl.BaseLayer>
  <LayersControl.Overlay checked={false} name="Regional Districts">
    <WMSTileLayer
      key={Math.random()}
      transparent={true}
      opacity={0.5}
      format={"image/png"}
      url="http://openmaps.gov.bc.ca/geo/ows"
      layers={"WHSE_LEGAL_ADMIN_BOUNDARIES.ABMS_REGIONAL_DISTRICTS_SP"}
    />
  </LayersControl.Overlay>
  <LayersControl.Overlay checked={false} name="Old Growth">
    <WMSTileLayer
      key={Math.random()}
      transparent={true}
      opacity={0.5}
      format={"image/png"}
      url="http://openmaps.gov.bc.ca/geo/ows"
      layers={"WHSE_FOREST_VEGETATION.OGSR_TAP_PRIORITY_DEF_AREA_SP"}
    />
  </LayersControl.Overlay>
  <LayersControl.Overlay checked={false} name="Fed Parks">
    <WMSTileLayer
      key={Math.random()}
      transparent={true}
      opacity={0.5}
      format={"image/png"}
      url="http://openmaps.gov.bc.ca/geo/ows"
      layers={"WHSE_ADMIN_BOUNDARIES.CLAB_NATIONAL_PARKS"}
    />
  </LayersControl.Overlay>
  <LayersControl.Overlay
    checked={false}
    name="Licensed Pizza Establishments"
  >
  </LayersControl.Overlay>
</LayersControl>
</MapContainer> */
};

export default Map;
