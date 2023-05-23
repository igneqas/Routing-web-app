import { Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { LocationObject } from "../../App";
import "./LocationChangeRow.css";

export interface LocationChangeRowProps {
  setLocations: (value: React.SetStateAction<LocationObject[]>) => void;
  inputCount: number;
  getAlternativeRoute: () => void;
  routeExists: boolean;
}

const LocationChangeRow = (props: LocationChangeRowProps) => {
  const { setLocations, inputCount, getAlternativeRoute, routeExists } = props;

  const buttonStyle = {
    backgroundColor: "rgb(167 103 57)",
    display: "flex",
    marginTop: "10px",
    marginBottom: "10px",
    width: "120px",
    padding: "3px",
  };

  return (
    <div className="add-row">
      <div className="alternative">
        {routeExists ? (
          <Button
            variant="contained"
            style={buttonStyle}
            onClick={getAlternativeRoute}
          >
            Alternative
          </Button>
        ) : (
          <></>
        )}
      </div>
      <div className="actions">
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
    </div>
  );
};

export default LocationChangeRow;
