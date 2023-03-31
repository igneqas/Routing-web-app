import "./App.css";
import "leaflet/dist/leaflet.css";
import Map from "./components/map/Map";
import { useEffect, useState } from "react";
import SearchBar from "./components/searchBar/SearchBar";
import { LatLngExpression } from "leaflet";

export type CoordsObject = {
  latitude: string;
  longitude: string;
};

const App = () => {
  const [centerCoords, setCenterCoords] = useState<LatLngExpression>([0, 0]);
  const [fromCoords, setFromCoords] = useState<CoordsObject | undefined>();
  const [toCoords, setToCoords] = useState<CoordsObject | undefined>();
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");

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

  const getData = async (url: string) => {
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

  const submitHandler = async (e: any) => {
    e.preventDefault();

    let fromLocationUrl =
      "https://nominatim.openstreetmap.org/search?q=" +
      fromLocation +
      "&format=json";
    let toLocationUrl =
      "https://nominatim.openstreetmap.org/search?q=" +
      toLocation +
      "&format=json";

    const fromLocationData = await getData(fromLocationUrl);
    setFromCoords(fromLocationData);
    const toLocationData = await getData(toLocationUrl);
    setToCoords(toLocationData);
  };

  return (
    <div className="App">
      <div className="login-button">
        <button>Log In</button>
      </div>
      <section className="form-container">
        <form>
          <SearchBar
            searchText={fromLocation}
            placeholder={"Starting point"}
            onChange={(value) => {
              setFromLocation(value);
            }}
          />
          <br />
          <SearchBar
            searchText={toLocation}
            placeholder={"Finish point"}
            onChange={(value) => {
              setToLocation(value);
            }}
          />
          <br />
          <button onClick={(e) => submitHandler(e)}>Search</button>
          <br />
          <button>Quickest</button>
          <button>Leisure</button>
          <button>Mountain bike</button>
          <button>Shortest</button>
          <button>Clean</button>
        </form>
      </section>
      <Map
        startPoint={fromCoords}
        finishPoint={toCoords}
        centerCoords={centerCoords}
      ></Map>
    </div>
  );
};

export default App;
