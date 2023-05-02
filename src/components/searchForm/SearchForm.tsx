// import { useMemo, useState } from "react";
// import RouteDetails from "../routeDetails/RouteDetails";
// import SearchBar from "../searchBar/SearchBar";

// export type CoordsObject = {
//   latitude: string;
//   longitude: string;
// };

// interface SearchFormProps {
//   setRouteCoords: () => void;
// }

// const SearchForm = (props: SearchFormProps) => {
//     const {setRouteCoords} = props;
//   const [fromLocation, setFromLocation] = useState("Kareiviu g. 20");
//   const [toLocation, setToLocation] = useState("Ozo g. 20");
//   const [route, setRoute] = useState(null);

//   const getCoordinates = async (url: string) => {
//     try {
//       const response = await fetch(url, {
//         method: "POST",
//         mode: "cors",
//         headers: {
//           "Access-Control-Allow-Origin": "https://o2cj2q.csb.app",
//         },
//       });
//       const responseJson = await response.json();
//       const coordsData = {
//         latitude: responseJson[0].lat,
//         longitude: responseJson[0].lon,
//       } as CoordsObject;
//       return coordsData;
//     } catch (e: any) {
//       console.log("Failed to get coordinates");
//     }
//   };

//   const submitHandler = async (
//     event: React.MouseEvent<HTMLButtonElement>,
//     profile: string
//   ) => {
//     event.preventDefault();

//     let fromLocationUrl =
//       "https://nominatim.openstreetmap.org/search?q=" +
//       fromLocation +
//       "&format=json";
//     let toLocationUrl =
//       "https://nominatim.openstreetmap.org/search?q=" +
//       toLocation +
//       "&format=json";

//     const startPointCoordinates = await getCoordinates(fromLocationUrl);
//     const finishPointCoordinates = await getCoordinates(toLocationUrl);

//     if (startPointCoordinates && finishPointCoordinates) {
//       const url = `http://localhost:8080/route/generate?lonlats=${startPointCoordinates?.longitude},${startPointCoordinates?.latitude};${finishPointCoordinates?.longitude},${finishPointCoordinates?.latitude};25.283256533410132,54.703824044178674&profile=${profile}&format=geojson`;
//       // const url = `http://localhost:8080/route/generate?lonlats=${startPointCoordinates?.longitude},${startPointCoordinates?.latitude};${finishPointCoordinates?.longitude},${finishPointCoordinates?.latitude}&profile=${profile}&format=geojson`;
//       const response = await fetch(url, {
//         method: "GET",
//       });
//       const routeJson = await response.json();
//       setRoute(routeJson);
//       const routeCoordinates = routeJson.features[0].geometry.coordinates;
//       parseCoordinates(routeCoordinates);
//     }
//   };

//   const parseCoordinates = (routeCoordinates: any) => {
//     let x = [];
//     for (var i = 0; i < routeCoordinates.length; i++) {
//       x.push([
//         routeCoordinates[i][1],
//         routeCoordinates[i][0],
//       ] as LatLngExpression);
//     }
//     setRouteCoords(x);
//   };

//   const handleSaveSubmit = async (name: string) => {
//     const token = getToken();
//     if (!token) {
//       window.location.reload();
//       return;
//     }
//     const bearerToken = "Bearer " + token;
//     await fetch("http://localhost:8080/route", {
//       method: "POST",
//       headers: {
//         Authorization: bearerToken,
//       },
//       body: JSON.stringify(formatRoute(route, name)),
//     });
//   };

//   const details = useMemo(() => {
//     console.log("OLA");
//     let distance;
//     let time;
//     let ascend;
//     try {
//       distance = (route as any)?.features[0].properties.trackLength;
//       time = (route as any)?.features[0].properties.totalTime;
//       ascend = (route as any)?.features[0].properties.filteredAscend;
//     } catch {
//       distance = (route as any)?.distance;
//       time = (route as any)?.time;
//       ascend = (route as any)?.ascend;
//     }
//     console.log(distance, time, ascend);
//     return { distance, time, ascend } as RouteDetailsObject;
//   }, [route]);

//   return (
//     <div>
//       <div className="search-form">
//         <SearchBar
//           searchText={fromLocation}
//           placeholder={"Starting point"}
//           onChange={(value) => {
//             setFromLocation(value);
//           }}
//         />
//         <br />
//         <SearchBar
//           searchText={toLocation}
//           placeholder={"Finish point"}
//           onChange={(value) => {
//             setToLocation(value);
//           }}
//         />
//         <br />
//         <button
//           onClick={(e) => {
//             submitHandler(e, "vm-forum-liegerad-schnell");
//           }}
//         >
//           Quickest
//         </button>
//         <button
//           onClick={(e) => {
//             submitHandler(e, "safety");
//           }}
//         >
//           Leisure
//         </button>
//         <button
//           onClick={(e) => {
//             submitHandler(e, "hiking-mountain");
//           }}
//         >
//           Mountain bike
//         </button>
//         <button
//           onClick={(e) => {
//             submitHandler(e, "shortest");
//           }}
//         >
//           Shortest
//         </button>
//         <button
//           onClick={(e) => {
//             submitHandler(e, "pollution-free");
//           }}
//         >
//           Clean
//         </button>
//       </div>
//       {route !== null ? (
//         <RouteDetails
//           routeDetails={details}
//           isLoggedIn={isLoggedIn}
//           handleSaveSubmit={handleSaveSubmit}
//         />
//       ) : (
//         <></>
//       )}
//     </div>
//   );
// };

const SearchForm = () => {
  return <></>;
};

export default SearchForm;
