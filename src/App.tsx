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
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [profile, setProfile] = useState("");
  const [routeCoords, setRouteCoords] = useState<
    (L.LatLngLiteral | L.LatLngTuple)[]
  >([]);

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

  const submitHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

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
      // const url = `http://localhost:17777/brouter?lonlats=${startPoint?.longitude},${startPoint?.latitude}|${finishPoint?.longitude},${finishPoint?.latitude}&nogos=25.292594717178225,54.68866926618792,100&profile=shortest&alternativeidx=0&format=geojson`;
      const url = `http://localhost:8080/route?lonlats=${startPointCoordinates?.longitude},${startPointCoordinates?.latitude};${finishPointCoordinates?.longitude},${finishPointCoordinates?.latitude}&profile=${profile}&format=geojson&nogos=25.292594717178225,54.68866926618792,100`;
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
      setRouteCoords(x);
    }
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
          <button
            onClick={(e) => {
              setProfile("vm-forum-liegerad-schnell");
              submitHandler(e);
            }}
          >
            Quickest
          </button>
          <button
            onClick={(e) => {
              setProfile("safety");
              submitHandler(e);
            }}
          >
            Leisure
          </button>
          <button
            onClick={(e) => {
              setProfile("trekking");
              submitHandler(e);
            }}
          >
            Mountain bike
          </button>
          <button
            onClick={(e) => {
              setProfile("shortest");
              submitHandler(e);
            }}
          >
            Shortest
          </button>
          <button
            onClick={(e) => {
              setProfile("shortest");
              submitHandler(e);
            }}
          >
            Clean
          </button>
        </form>
      </section>
      <Map routeCoords={routeCoords} centerCoords={centerCoords}></Map>
    </div>
  );
};

export default App;
