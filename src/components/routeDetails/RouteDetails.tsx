import { Box, Button, Typography } from "@mui/material";
import SaveRouteModal from "../saveRouteModal/SaveRouteModal";
import { useState } from "react";
import { getRouteType } from "../../utils/RouteUtils";

export interface RouteDetailsObject {
  distance: number;
  time: number;
  ascend: number;
  type: string;
  name?: string;
}

interface RouteDetailsParams {
  routeDetails: RouteDetailsObject;
  isLoggedIn: boolean;
  handleSaveSubmit: (name: string) => void;
}

const RouteDetails = (params: RouteDetailsParams) => {
  const { routeDetails, isLoggedIn, handleSaveSubmit } = params;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const boxStyle = {
    position: "absolute",
    width: "335px",
    bgcolor: "darkgray",
    border: "2px solid #6c6c6c",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    marginTop: "10px",
    padding: "10px",
    paddingLeft: "20px",
  };

  const buttonStyle = {
    backgroundColor: "rgb(167 103 57)",
    display: "flex",
    marginTop: "10px",
    marginBottom: "10px",
    width: "120px",
    padding: "3px",
  };

  return (
    <Box sx={boxStyle}>
      {isLoggedIn && !routeDetails.name ? (
        <>
          <Button variant="contained" style={buttonStyle} onClick={handleOpen}>
            Save route
          </Button>
          <SaveRouteModal
            handleSaveSubmit={handleSaveSubmit}
            open={open}
            handleClose={handleClose}
          />
        </>
      ) : (
        <></>
      )}

      {routeDetails.name ? (
        <Typography variant="h6">Route: {routeDetails.name}</Typography>
      ) : (
        <></>
      )}

      <Typography variant="h6">
        Mode: {getRouteType(routeDetails.type)}
      </Typography>
      <Typography variant="h6">
        Distance: {(routeDetails.distance / 1000).toFixed(2)} km
      </Typography>
      <Typography variant="h6">
        Travel time: {(routeDetails.time / 60).toFixed(0)} min
      </Typography>
      <Typography variant="h6">Ascend: {routeDetails.ascend} m</Typography>
    </Box>
  );
};

export default RouteDetails;
