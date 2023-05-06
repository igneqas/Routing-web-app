import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";

interface RouteTypeSelectionProps {
  changeHandler: (profile: string) => void;
  isMobileDevice: boolean;
}

const RouteTypeSelection = (props: RouteTypeSelectionProps) => {
  const { changeHandler, isMobileDevice } = props;
  const [selection, setSelection] = useState("");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newSelection: string
  ) => {
    event.stopPropagation();

    if (newSelection === null) {
      changeHandler(selection);
      return;
    }
    setSelection(newSelection);
    changeHandler(newSelection);
  };

  const groupStyle = {
    display: "flex",
    flexDirection: "row" as "row",
    flexWrap: "wrap" as "wrap",
    justifyContent: "center",
    marginTop: isMobileDevice ? "3px" : "10px",
  };

  const style = {
    color: "black",
    backgroundColor: "#e1ac86",
    fontSize: isMobileDevice ? "small" : "medium",
    border: "1px solid #6c6c6c",
    margin: "4px",
    padding: "5px",
    textTransform: "capitalize" as "capitalize",
    borderRadius: "4px",
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={selection}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      style={groupStyle}
    >
      <ToggleButton value="vm-forum-liegerad-schnell" style={style}>
        Quickest
      </ToggleButton>
      <ToggleButton value="safety" style={style}>
        Leisure
      </ToggleButton>
      <ToggleButton value="shortest" style={style}>
        Shortest
      </ToggleButton>
      <ToggleButton value="pollution-free" style={style}>
        Pollution-free
      </ToggleButton>
      <ToggleButton value="hiking-mountain" style={style}>
        Mountain bike
      </ToggleButton>
      {/* <ToggleButton value="android">Android</ToggleButton>
    <ToggleButton value="ios">iOS</ToggleButton> */}
    </ToggleButtonGroup>
  );
};

export default RouteTypeSelection;
