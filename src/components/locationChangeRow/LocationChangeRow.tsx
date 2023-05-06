import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { LocationObject } from "../../App";
import "./LocationChangeRow.css";

interface LocationChangeRowProps {
  setLocations: (value: React.SetStateAction<LocationObject[]>) => void;
  inputCount: number;
}

const LocationChangeRow = (props: LocationChangeRowProps) => {
  const { setLocations, inputCount } = props;

  return (
    <div className="add-row">
      {inputCount > 2 ? (
        <IconButton
          onClick={() => {
            setLocations((prevState) => {
              prevState.pop();
              return [...prevState];
            });
          }}
        >
          <RemoveIcon />
        </IconButton>
      ) : (
        <></>
      )}
      <IconButton
        onClick={() => {
          setLocations((prevState) => {
            return [...prevState, { name: "" }];
          });
        }}
      >
        <AddIcon />
      </IconButton>
    </div>
  );
};

export default LocationChangeRow;
