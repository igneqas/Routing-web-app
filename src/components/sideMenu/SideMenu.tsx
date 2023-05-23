import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MapIcon from "@mui/icons-material/Map";
import DeleteIcon from "@mui/icons-material/Delete";
import { getToken, setToken, signOut } from "../../utils/TokenHandler";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import RouteFilter from "../routeFilter/RouteFilter";
import dayjs, { Dayjs } from "dayjs";
import { getRouteType } from "../../utils/RouteUtils";

interface SideMenuParams {
  handleViewRouteInfo: (route: any) => void;
}

const SideMenu = (params: SideMenuParams) => {
  const { handleViewRouteInfo } = params;
  const [isOpen, setIsOpen] = useState(false);
  const [routes, setRoutes] = useState<any[]>([]);
  const [filteredRoutes, setFilteredRoutes] = useState<any>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [distance, setDistance] = useState<number[]>([0, 20]);
  const [distanceLimits, setDistanceLimits] = useState<number[]>([0, 20]);
  const handleDistanceChange = (event: Event, newValue: number | number[]) => {
    setDistance(newValue as number[]);
  };

  const [duration, setDuration] = useState<number[]>([0, 20]);
  const [durationLimits, setDurationLimits] = useState<number[]>([0, 20]);
  const handleDurationChange = (event: Event, newValue: number | number[]) => {
    setDuration(newValue as number[]);
  };

  const [tripType, setTripType] = useState("All");
  const handleTripTypeChange = (newValue: string) => setTripType(newValue);

  const [date, setDate] = useState<Dayjs[]>([
    dayjs("2022-04-17"),
    dayjs("2022-04-17"),
  ]);
  const [dateLimits, setDateLimits] = useState<Dayjs[]>([
    dayjs("2022-04-17"),
    dayjs("2022-04-17"),
  ]);
  const handleDateChange = (newValue: Dayjs[]) => setDate(newValue);

  useEffect(() => {
    const maxRouteLength =
      Math.max(...routes.map((route: any) => route.distance)) / 1000;
    const minRouteLength =
      Math.min(...routes.map((route: any) => route.distance)) / 1000;
    setDistanceLimits([minRouteLength, maxRouteLength]);
    setDistance([minRouteLength, maxRouteLength]);

    const maxRouteDuration =
      Math.max(...routes.map((route: any) => route.time)) / 60;
    const minRouteDuration =
      Math.min(...routes.map((route: any) => route.time)) / 60;
    setDurationLimits([
      Math.trunc(minRouteDuration),
      Math.ceil(maxRouteDuration),
    ]);
    setDuration([Math.trunc(minRouteDuration), Math.ceil(maxRouteDuration)]);

    if (routes.length > 0) {
      const sortedRoutes = routes;
      sortedRoutes.sort((one: any, two: any) =>
        one.dateCreated > two.dateCreated ? -1 : 1
      );
      const maxRouteDate = (sortedRoutes[0].dateCreated as string).split(
        " "
      )[0];
      const minRouteDate = (
        sortedRoutes[sortedRoutes.length - 1].dateCreated as string
      ).split(" ")[0];
      setDateLimits([dayjs(minRouteDate), dayjs(maxRouteDate)]);
      setDate([dayjs(minRouteDate), dayjs(maxRouteDate)]);
    }
  }, [routes]);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      if (open) {
        getRoutes();
      }
      setIsOpen(open);
    };

  const handleDeleteRoute = async (route: any) => {
    const token = getToken();
    if (!token) {
      window.location.reload();
      return;
    }
    const bearerToken = "Bearer " + token;
    const response = await fetch(`http://localhost:8080/route?id=${route.id}`, {
      method: "DELETE",
      headers: {
        Authorization: bearerToken,
      },
    });
    if (response.status !== 200) {
      window.location.reload();
      setToken("");
      return;
    }
  };

  useEffect(() => {
    const result = routes.filter(
      (route: any) =>
        route.distance / 1000 >= distance[0] &&
        route.distance / 1000 <= distance[1] &&
        route.time / 60 >= duration[0] &&
        route.time / 60 <= duration[1] &&
        (dayjs(route.dateCreated.split(" ")[0]).isAfter(date[0], "day") ||
          dayjs(route.dateCreated.split(" ")[0]).isSame(date[0], "day")) &&
        (dayjs(route.dateCreated.split(" ")[0]).isBefore(date[1], "day") ||
          dayjs(route.dateCreated.split(" ")[0]).isSame(date[1], "day")) &&
        (tripType !== "All" ? getRouteType(route.type) === tripType : true)
    );

    setFilteredRoutes(result);
  }, [distance, duration, date, tripType]);

  const list = () => (
    <Box sx={{ width: 250 }} role="presentation">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" style={{ margin: "10px", marginLeft: "15px" }}>
          My routes
        </Typography>
        <IconButton
          style={{ marginRight: "3%" }}
          onClick={() => {
            setIsFilterOpen(!isFilterOpen);
          }}
        >
          <FilterAltIcon />
        </IconButton>
      </div>
      {isFilterOpen ? (
        <RouteFilter
          distance={distance}
          distanceLimits={distanceLimits}
          handleDistanceChange={handleDistanceChange}
          duration={duration}
          durationLimits={durationLimits}
          handleDurationChange={handleDurationChange}
          date={date}
          dateLimits={dateLimits}
          handleDateChange={handleDateChange}
          tripType={tripType}
          handleTripTypeChange={handleTripTypeChange}
        />
      ) : (
        <></>
      )}
      <List onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
        {[...filteredRoutes].map((route) => (
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleViewRouteInfo(route)}>
              <ListItemIcon>
                <MapIcon />
              </ListItemIcon>
              <div>
                <ListItemText
                  primary={route.name}
                  secondary={route.dateCreated}
                />
              </div>
            </ListItemButton>
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                marginLeft: "10px",
                paddingRight: "7px",
              }}
            >
              <IconButton
                aria-label="delete"
                onClick={() => handleDeleteRoute(route)}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const getRoutes = async () => {
    const token = getToken();
    if (!token) {
      window.location.reload();
      return;
    }
    const bearerToken = "Bearer " + token;
    const response = await fetch("http://localhost:8080/route/getSavedRoutes", {
      method: "GET",
      headers: {
        Authorization: bearerToken,
      },
    });
    // TODO: add to other places
    if (response.status !== 200) {
      window.location.reload();
      setToken("");
      return;
    }
    const routesJson = await response.json();
    setRoutes(routesJson);
  };

  const buttonStyle = {
    margin: "4px",
    backgroundColor: "#a5551b",
    marginRight: "20px",
  };

  return (
    <div>
      <Button
        className="routes-button"
        variant="contained"
        size="small"
        style={buttonStyle}
        color="primary"
        onClick={toggleDrawer(true)}
      >
        View saved routes
      </Button>
      <Button
        className="sign-out-button"
        variant="contained"
        size="small"
        style={buttonStyle}
        color="primary"
        onClick={() => signOut()}
      >
        Sign Out
      </Button>
      <Drawer anchor={"right"} open={isOpen} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
};

export default SideMenu;
