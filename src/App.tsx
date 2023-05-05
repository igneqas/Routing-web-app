import "./App.css";
import "leaflet/dist/leaflet.css";
import Map from "./components/map/Map";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import SearchBar from "./components/searchBar/SearchBar";
import LoginModal from "./components/login/LoginModal";
import L, { LatLngExpression } from "leaflet";
import RouteDetails, {
  RouteDetailsObject,
} from "./components/routeDetails/RouteDetails";
import { getToken, setToken } from "./utils/TokenHandler";
import { formatRoute } from "./utils/RouteUtils";
import SideMenu from "./components/sideMenu/SideMenu";
import { Box, useMediaQuery } from "@mui/material";
import RouteTypeSelection from "./components/routeTypeSelection/RouteTypeSelection";

export type CoordsObject = {
  latitude: string;
  longitude: string;
};

const App = () => {
  const [centerCoords, setCenterCoords] = useState<LatLngExpression>([0, 0]);
  const [fromLocation, setFromLocation] = useState("Kareiviu g. 20");
  const [toLocation, setToLocation] = useState("Ozo g. 20");
  const [routeCoords, setRouteCoords] = useState<
    (L.LatLngLiteral | L.LatLngTuple)[]
  >([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [route, setRoute] = useState(null);

  const isMobileDevice = useMediaQuery("(max-width: 370px)");

  useEffect(() => {
    const token = getToken();
    setIsLoggedIn(token ? true : false);
  }, [sessionStorage]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      getCurrentCityName,
      error,
      options
    );
  }, []);

  const error = (err: any) => {
    if (
      err.code === 1 || //if user denied accessing the location
      err.code === 2 || //for any internal errors
      err.code === 3 //error due to timeout
    ) {
      alert(err.message);
    } else {
      alert(err);
    }
  };

  const options = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000,
  };

  function getCurrentCityName(position: any) {
    setCenterCoords([position.coords.latitude, position.coords.longitude]);
  }

  const getCoordinates = async (url: string) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "https://o2cj2q.csb.app",
        },
      });
      const responseJson = await response.json();
      const coordsData = {
        latitude: responseJson[0].lat,
        longitude: responseJson[0].lon,
      } as CoordsObject;
      return coordsData;
    } catch (e: any) {
      console.log("Failed to get coordinates");
    }
  };

  const routeTypeHandler = async (profile: string) => {
    let fromLocationUrl =
      "https://nominatim.openstreetmap.org/search?q=" +
      fromLocation +
      "&format=json";
    let toLocationUrl =
      "https://nominatim.openstreetmap.org/search?q=" +
      toLocation +
      "&format=json";

    const startPointCoordinates = await getCoordinates(fromLocationUrl);
    const finishPointCoordinates = await getCoordinates(toLocationUrl);

    if (startPointCoordinates && finishPointCoordinates) {
      const url = `http://localhost:8080/route/generate?lonlats=${startPointCoordinates?.longitude},${startPointCoordinates?.latitude};${finishPointCoordinates?.longitude},${finishPointCoordinates?.latitude};25.283256533410132,54.703824044178674&profile=${profile}&format=geojson`;
      // const url = `http://localhost:8080/route/generate?lonlats=${startPointCoordinates?.longitude},${startPointCoordinates?.latitude};${finishPointCoordinates?.longitude},${finishPointCoordinates?.latitude}&profile=${profile}&format=geojson`;
      const response = await fetch(url, {
        method: "GET",
      });
      const routeJson = await response.json();
      setRoute(routeJson);
      const routeCoordinates = routeJson.features[0].geometry.coordinates;
      parseCoordinates(routeCoordinates);
    }
  };

  const parseCoordinates = (routeCoordinates: any) => {
    let x = [];
    for (var i = 0; i < routeCoordinates.length; i++) {
      x.push([
        routeCoordinates[i][1],
        routeCoordinates[i][0],
      ] as LatLngExpression);
    }
    setRouteCoords(x);
  };

  const handleSaveSubmit = async (name: string) => {
    const token = getToken();
    if (!token) {
      window.location.reload();
      return;
    }
    const bearerToken = "Bearer " + token;
    const response = await fetch("http://localhost:8080/route", {
      method: "POST",
      headers: {
        Authorization: bearerToken,
      },
      body: JSON.stringify(formatRoute(route, name)),
    });
    if (response.status !== 200) {
      window.location.reload();
      setToken("");
      return;
    }
  };

  const details = useMemo(() => {
    let distance;
    let time;
    let ascend;
    let type;
    let name;
    try {
      distance = (route as any)?.features[0].properties.trackLength;
      time = (route as any)?.features[0].properties.totalTime;
      ascend = (route as any)?.features[0].properties.filteredAscend;
      type = (route as any)?.features[0].properties.name;
    } catch {
      distance = (route as any)?.distance;
      time = (route as any)?.time;
      ascend = (route as any)?.ascend;
      type = (route as any)?.type;
      name = (route as any)?.name;
    }

    return { distance, time, ascend, type, name } as RouteDetailsObject;
  }, [route]);

  const handleViewRouteInfo = (route: any) => {
    setRoute(route);
    parseCoordinates(route.coordinates);
  };

  const SearchFormStyle = useMemo(() => {
    return {
      bgcolor: "darkgray",
      border: "2px solid #6c6c6c",
      boxShadow: 24,
      p: 4,
      display: "flex",
      flexDirection: "column",
      padding: isMobileDevice ? "0px" : "20px",
      paddingTop: isMobileDevice ? "5px" : "10px",
    };
  }, [isMobileDevice]);

  useEffect(() => {
    const element = document.getElementById("search");
    if (element) {
      L.DomEvent.disableClickPropagation(element!);
    }
  });

  return (
    <div className="App">
      <div className="top-toolbar">
        {!isLoggedIn ? (
          <LoginModal isMobileDevice={isMobileDevice} />
        ) : (
          <SideMenu handleViewRouteInfo={handleViewRouteInfo} />
        )}
      </div>
      <Map routeCoords={routeCoords} centerCoords={centerCoords}>
        <section className="form-container">
          <div id="search">
            <Box sx={SearchFormStyle}>
              <SearchBar
                searchText={fromLocation}
                placeholder={"Starting point"}
                onChange={(value) => {
                  setFromLocation(value);
                }}
                isMobileDevice={isMobileDevice}
              />
              <SearchBar
                searchText={toLocation}
                placeholder={"Finish point"}
                onChange={(value) => {
                  setToLocation(value);
                }}
                isMobileDevice={isMobileDevice}
              />
              {/* <SearchBar
                searchText={"Žalgirio g. 105"}
                placeholder={"Finish point"}
                onChange={(value) => {
                  setToLocation(value);
                }}
              /> */}
              <RouteTypeSelection
                submitHandler={routeTypeHandler}
                isMobileDevice={isMobileDevice}
              />
            </Box>
            {route !== null ? (
              <RouteDetails
                routeDetails={details}
                isLoggedIn={isLoggedIn}
                handleSaveSubmit={handleSaveSubmit}
              />
            ) : (
              <></>
            )}
          </div>
        </section>
      </Map>
    </div>
  );
};

export default App;
