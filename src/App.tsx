import "./App.css";
import "leaflet/dist/leaflet.css";
import Map from "./components/map/Map";
import { useEffect, useMemo, useState } from "react";
import SearchBar from "./components/searchBar/SearchBar";
import LoginModal from "./components/loginModal/LoginModal";
import L, { LatLngExpression } from "leaflet";
import RouteDetails, {
  RouteDetailsObject,
} from "./components/routeDetails/RouteDetails";
import { getToken, setToken } from "./utils/TokenHandler";
import { formatRoute } from "./utils/RouteUtils";
import SideMenu from "./components/sideMenu/SideMenu";
import { Box, useMediaQuery } from "@mui/material";
import RouteTypeSelection from "./components/routeTypeSelection/RouteTypeSelection";
import LocationChangeRow from "./components/locationChangeRow/LocationChangeRow";

export type CoordsObject = {
  latitude: string;
  longitude: string;
};

export interface LocationObject {
  name: string;
  latitude?: string;
  longitude?: string;
}

const App = () => {
  const [centerCoords, setCenterCoords] = useState<LatLngExpression>([0, 0]);
  const [locations, setLocations] = useState<LocationObject[]>([
    {
      name: "",
    },
    {
      name: "",
    },
  ]);
  const [routeCoords, setRouteCoords] = useState<
    (L.LatLngLiteral | L.LatLngTuple)[]
  >([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [route, setRoute] = useState(null);
  const [tripType, setTripType] = useState("vm-forum-liegerad-schnell");
  const [isSearchBarActive, setIsSearchBarActive] = useState(false);

  const isMobileDevice = useMediaQuery("(max-width: 370px)");

  useEffect(() => {
    const token = getToken();
    setIsLoggedIn(token ? true : false);
  }, [sessionStorage]);

  useEffect(() => {
    if (
      !locations.some(
        (location) => !location.latitude || !location.longitude
      ) &&
      !isSearchBarActive
    )
      generateRoute();
  }, [tripType, locations, isSearchBarActive]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      getCurrentCityName,
      error,
      options
    );
  }, [navigator]);

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

  const generateRoute = async () => {
    let formattedCoordinates = "";
    locations.forEach((location) => {
      formattedCoordinates += `${location?.longitude},${location?.latitude};`;
    });
    formattedCoordinates = formattedCoordinates.slice(0, -1);
    const url = `http://localhost:8080/route/generate?lonlats=${formattedCoordinates}&profile=${tripType}`;
    const response = await fetch(url, {
      method: "GET",
    });
    const routeJson = await response.json();
    setRoute(routeJson);
    const routeCoordinates = routeJson.features[0].geometry.coordinates;
    parseCoordinates(routeCoordinates);
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
              {locations.map((location, index) => (
                <SearchBar
                  selectedLocation={location}
                  placeholder={"Enter location"}
                  onChange={(value) => {
                    setLocations((prevState) => {
                      prevState[index] = value;
                      return [...prevState];
                    });
                  }}
                  isMobileDevice={isMobileDevice}
                  setIsActive={(value: boolean) => setIsSearchBarActive(value)}
                />
              ))}
              <LocationChangeRow
                setLocations={setLocations}
                inputCount={locations.length}
              />
              <RouteTypeSelection
                changeHandler={(value: string) => setTripType(value)}
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
