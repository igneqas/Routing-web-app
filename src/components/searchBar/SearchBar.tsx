import { Autocomplete, TextField, debounce } from "@mui/material";
import "./SearchBar.css";
import { useCallback, useEffect, useState } from "react";
import { LocationObject } from "../../App";

interface SearchBarProps {
  selectedLocation: LocationObject;
  placeholder: string;
  onChange: (location: LocationObject) => void;
  isMobileDevice: boolean;
  setIsActive: (value: boolean) => void;
}

const SearchBar = (props: SearchBarProps) => {
  const {
    selectedLocation,
    placeholder,
    onChange,
    isMobileDevice,
    setIsActive,
  } = props;
  const [locations, setLocations] = useState<LocationObject[]>([{ name: "" }]);

  const searchChangeHandler = async (value: string) => {
    const url =
      "https://nominatim.openstreetmap.org/search?q=" +
      value +
      "&format=json&addressdetails=1";

    const locations = await getLocations(url);
    const parsedLocations: LocationObject[] = [];
    locations.forEach((locat: any) => {
      if (parsedLocations.length <= 5)
        parsedLocations.push({
          name: locat.display_name,
          latitude: locat.lat,
          longitude: locat.lon,
        });
    });
    setLocations(parsedLocations);
  };

  const debouncedChangeHandler = useCallback(
    debounce((value: string) => {
      searchChangeHandler(value);
    }, 1000),
    []
  );

  useEffect(() => {
    onChange(
      {
        name: selectedLocation.name,
        latitude: locations[0]?.latitude,
        longitude: locations[0]?.longitude,
      } ?? { name: "" }
    );
  }, [locations]);

  const handleInputChange = (value: any) => {
    if (!value) {
      onChange({
        name: "",
      });
      return;
    }
    const location = locations.filter((location) => location.name === value);
    onChange({
      name: value,
      longitude: location[0]?.longitude,
      latitude: location[0]?.latitude,
    });
    debouncedChangeHandler(value);
  };

  const getLocations = async (url: string) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "https://o2cj2q.csb.app",
        },
      });
      const responseJson = await response.json();
      return responseJson;
    } catch (e: any) {
      console.log("Failed to get coordinates");
    }
  };

  return (
    <Autocomplete
      filterOptions={(x) => x}
      options={locations.map((option) => option.name)}
      freeSolo
      value={selectedLocation.name}
      noOptionsText="No locations"
      onChange={(event: any, newValue: any) => {
        handleInputChange(newValue);
        setIsActive(false);
      }}
      onInputChange={(event, newInputValue) => {
        handleInputChange(newInputValue);
      }}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
      renderInput={(params) => (
        <TextField
          {...params}
          className="searchbar"
          margin={isMobileDevice ? "none" : "dense"}
          variant="outlined"
          placeholder={placeholder}
          size="small"
        />
      )}
    />
  );
};

export default SearchBar;
