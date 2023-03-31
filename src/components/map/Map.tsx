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

  const getStartPoint = () => {
    return [coor[0][1], coor[0][0]] as LatLngExpression;
  };

  const getFinishPoint = () => {
    const lastElementIndex = coor.length - 1;
    return [
      coor[lastElementIndex][1],
      coor[lastElementIndex][0],
    ] as LatLngExpression;
  };

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
      <Marker position={getStartPoint()} icon={customIcon}></Marker>
      <Marker position={getFinishPoint()} icon={customIcon}></Marker>
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

const coor = [
  [25.282308, 54.705775, 117.75],
  [25.282584, 54.705756, 117.25],
  [25.28278, 54.705703, 116.75],
  [25.28305, 54.705661, 116.5],
  [25.28319, 54.705606, 116.25],
  [25.283341, 54.705545, 115.75],
  [25.283553, 54.705518, 115.75],
  [25.283651, 54.705505, 115.75],
  [25.283784, 54.705494, 115.75],
  [25.284056, 54.705459, 115.5],
  [25.284185, 54.705442, 115.5],
  [25.284185, 54.705442, 115.5],
  [25.284104, 54.705179, 114.5],
  [25.28403, 54.704906, 113.25],
  [25.283987, 54.704712, 112.25],
  [25.283941, 54.704338, 110],
  [25.283913, 54.704185, 109],
  [25.283868, 54.703912, 108.5],
  [25.283835, 54.70378, 108.5],
  [25.283806, 54.703645, 108.25],
  [25.283806, 54.703645, 108.25],
  [25.283961, 54.703636, 108.25],
  [25.284047, 54.703671, 108.25],
  [25.284495, 54.703663, 108.25],
  [25.28488, 54.703655, 108.25],
  [25.285314, 54.703647, 108.25],
  [25.286179, 54.703632, 108.25],
  [25.286783, 54.703569, 108.25],
  [25.287526, 54.703442, 108.25],
  [25.287702, 54.70339, 108],
  [25.287773, 54.703391, 108],
  [25.287883, 54.703532, 108.5],
  [25.287981, 54.703643, 108.75],
  [25.288131, 54.703635, 108.75],
  [25.288284, 54.703581, 108.75],
  [25.288504, 54.703572, 109],
  [25.288598, 54.703581, 109],
  [25.289025, 54.703617, 109.5],
  [25.289334, 54.703645, 109.75],
  [25.289819, 54.703688, 109.75],
  [25.289931, 54.703683, 109.75],
  [25.290263, 54.703671, 110],
  [25.290442, 54.703668, 109.75],
  [25.290742, 54.703657, 110],
  [25.291257, 54.703708, 109.75],
  [25.291257, 54.703708, 109.75],
  [25.291314, 54.703716, 109.5],
  [25.292183, 54.703853, 109],
  [25.292344, 54.703879, 109],
  [25.293952, 54.704127, 108],
  [25.294102, 54.704149, 108],
  [25.294495, 54.70421, 108.5],
  [25.294558, 54.704219, 108.5],
  [25.294933, 54.704281, 109],
  [25.295613, 54.704387, 109],
  [25.297306, 54.704655, 107.25],
  [25.298059, 54.704773, 107.5],
  [25.298241, 54.704805, 107.5],
  [25.299001, 54.704922, 107.75],
  [25.299449, 54.70499, 108.25],
  [25.299679, 54.705029, 108.5],
  [25.299815, 54.705048, 108.75],
  [25.300802, 54.705202, 109],
  [25.300833, 54.70534, 109.25],
  [25.302122, 54.705546, 109],
  [25.302773, 54.705638, 108],
  [25.302856, 54.705648, 108],
  [25.303262, 54.705692, 107],
  [25.303627, 54.705713, 106.25],
  [25.303941, 54.705722, 105.5],
  [25.304242, 54.705724, 104.75],
  [25.304504, 54.705704, 104],
  [25.304791, 54.705689, 103.25],
  [25.305335, 54.705653, 100.5],
  [25.308297, 54.705341, 95.25],
  [25.308541, 54.705315, 96.25],
  [25.308723, 54.705292, 97],
  [25.308723, 54.705292, 97],
  [25.308799, 54.705188, 97.25],
  [25.308807, 54.70513, 97.5],
  [25.308763, 54.705087, 97.25],
  [25.308694, 54.705049, 97],
  [25.308694, 54.705049, 97],
  [25.308468, 54.705044, 96.25],
  [25.308274, 54.705034, 95.75],
  [25.308068, 54.705015, 95.25],
  [25.307908, 54.704993, 94.75],
  [25.307679, 54.704961, 94.25],
  [25.307662, 54.704984, 94.25],
  [25.307653, 54.705021, 94.25],
  [25.307662, 54.704984, 94.25],
  [25.307679, 54.704961, 94.25],
  [25.307726, 54.704909, 94.5],
  [25.307752, 54.704854, 94.5],
  [25.307517, 54.704811, 94],
  [25.307426, 54.704827, 93.75],
  [25.308017, 54.705928, 93.5],
  [25.308225, 54.706235, 93.25],
  [25.308579, 54.706668, 93],
  [25.30867, 54.706715, 93.25],
  [25.308692, 54.706734, 93.25],
  [25.308966, 54.707009, 93.25],
  [25.309029, 54.707113, 93.25],
  [25.309283, 54.707382, 93],
  [25.309842, 54.708056, 94.25],
  [25.310055, 54.708288, 94.25],
  [25.310094, 54.708342, 94.5],
  [25.310192, 54.708476, 94.75],
  [25.310319, 54.708689, 95],
  [25.310671, 54.709322, 95],
  [25.310956, 54.709899, 95.5],
  [25.31106, 54.710181, 95.5],
  [25.311096, 54.710317, 95.25],
  [25.31114, 54.710581, 94.75],
  [25.311196, 54.710772, 94.25],
  [25.311306, 54.711101, 94.25],
  [25.3116, 54.712182, 92.25],
  [25.311791, 54.712833, 92],
  [25.311895, 54.713106, 92.5],
  [25.312125, 54.713542, 93.5],
  [25.312255, 54.713753, 93.75],
  [25.313035, 54.714929, 94.25],
  [25.313181, 54.715203, 94.75],
  [25.313314, 54.715643, 95.5],
  [25.313334, 54.71582, 95.75],
  [25.313332, 54.71615, 95],
  [25.313341, 54.71621, 95],
  [25.313358, 54.716472, 94.5],
  [25.313346, 54.71664, 94],
  [25.313255, 54.716895, 94.25],
  [25.312962, 54.717641, 95.25],
  [25.312888, 54.717885, 95.75],
  [25.312892, 54.717948, 96],
  [25.312912, 54.718011, 96],
  [25.312951, 54.71807, 96.25],
  [25.312951, 54.71807, 96.25],
  [25.313073, 54.718157, 96.75],
  [25.313197, 54.718213, 97.25],
  [25.313328, 54.718245, 97.75],
  [25.313581, 54.718262, 98.5],
  [25.313931, 54.71827, 99.75],
  [25.313972, 54.718272, 100],
  [25.314288, 54.71828, 101.25],
  [25.314734, 54.718262, 103.5],
  [25.314786, 54.718244, 103.75],
  [25.31485, 54.718238, 104],
  [25.315076, 54.718261, 105],
  [25.315821, 54.718287, 106.75],
  [25.316144, 54.71832, 107.5],
  [25.316319, 54.718359, 108],
  [25.316443, 54.718406, 108.25],
  [25.316527, 54.718477, 108.5],
  [25.316584, 54.718543, 108.75],
  [25.316597, 54.718603, 108.75],
  [25.316592, 54.718661, 108.75],
  [25.316576, 54.71871, 108.75],
  [25.316548, 54.718745, 108.5],
  [25.316745, 54.718741, 109],
  [25.316941, 54.718738, 109.5],
  [25.316941, 54.718738, 109.5],
  [25.317019, 54.718977, 109.75],
  [25.317112, 54.71933, 109.75],
  [25.317109, 54.719535, 109.75],
  [25.317146, 54.719633, 109.75],
  [25.317334, 54.719941, 110.25],
  [25.317541, 54.720227, 110.5],
  [25.317653, 54.720208, 111],
  [25.317661, 54.720222, 111],
  [25.317702, 54.720298, 111],
  [25.317724, 54.720339, 110.75],
  [25.31773, 54.72035, 110.75],
  [25.318127, 54.721016, 110.75],
  [25.318335, 54.721323, 110.75],
  [25.318363, 54.72137, 110.75],
  [25.318472, 54.721349, 111.5],
  [25.318729, 54.721735, 112],
  [25.319038, 54.721973, 112.75],
  [25.319079, 54.72201, 112.75],
  [25.319386, 54.72228, 113],
  [25.319464, 54.722337, 113.25],
  [25.319566, 54.722411, 113.25],
  [25.319724, 54.722471, 113.75],
  [25.320513, 54.723091, 117.5],
  [25.321135, 54.723514, 120.5],
  [25.321259, 54.723581, 121],
  [25.321334, 54.723632, 121.25],
  [25.321377, 54.723661, 121.5],
  [25.321258, 54.723718, 121.25],
  [25.321838, 54.724109, 123.5],
  [25.322287, 54.724398, 124.25],
];
