import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Popover,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { getRouteColor } from "../../utils/RouteUtils";

interface RouteSuggestionsProps {
  startPoint: L.LatLngTuple;
  endPoint: L.LatLngTuple;
  profile: string;
  handleViewRouteInfo: (route: any) => void;
  suggestionRoutes: any[];
  setSuggestionRoutes: (routes: any) => void;
  route: any;
}

const RouteSuggestions = (props: RouteSuggestionsProps) => {
  const {
    startPoint,
    endPoint,
    profile,
    handleViewRouteInfo,
    suggestionRoutes,
    setSuggestionRoutes,
    route,
  } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [checked, setChecked] = useState(true);
  const [cachedRoutes, setCachedRoutes] = useState<any[]>();
  const open = Boolean(anchorEl);

  const buttonStyle = {
    margin: "4px",
    backgroundColor: "#a5551b",
    marginLeft: "20px",
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    getRoutes();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getRoutes = async () => {
    if (startPoint && endPoint && profile) {
      const response = await fetch(
        `http://localhost:8080/route/suggestions?lonlats=${startPoint[1]},${startPoint[0]};${endPoint[1]},${endPoint[0]}&profile=${profile}`,
        {
          method: "GET",
        }
      );

      const routesJson = await response.json();
      setSuggestionRoutes(routesJson);
    }
  };

  const handleViewSingleRoute = (route: any) => {
    setSuggestionRoutes([route]);
    route.name = undefined;
    handleViewRouteInfo(route);
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSuggestionRoutes(cachedRoutes);
    } else {
      setCachedRoutes(suggestionRoutes);
      setSuggestionRoutes([]);
    }
    setChecked(event.target.checked);
  };

  return (
    <div>
      {route ? (
        <Button
          variant="contained"
          size="small"
          style={buttonStyle}
          color="primary"
          onClick={handleButtonClick}
        >
          View similar routes
        </Button>
      ) : (
        <></>
      )}

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Stack
          direction="row"
          spacing={0}
          alignItems="center"
          style={{ marginLeft: "10px", marginRight: "10px" }}
        >
          <Typography>Hide</Typography>
          <Switch
            onChange={handleSwitchChange}
            checked={checked}
            color="warning"
          />
          <Typography>Show</Typography>
        </Stack>
        <List onClick={handleClose} onKeyDown={handleClose}>
          {[...suggestionRoutes].map((route, index) => (
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleViewSingleRoute(route)}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <ListItemText primary={`Suggestion #${index + 1}`} />
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      backgroundColor: getRouteColor(index),
                      marginLeft: "10px",
                    }}
                  />
                </div>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Popover>
    </div>
  );
};

export default RouteSuggestions;
