import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import MapIcon from "@mui/icons-material/Map";
import { getToken, setToken } from "../../utils/TokenHandler";

interface SideMenuParams {
  handleViewRouteInfo: (route: any) => void;
}

const SideMenu = (params: SideMenuParams) => {
  const { handleViewRouteInfo } = params;
  const [isOpen, setIsOpen] = useState(false);
  const [routes, setRoutes] = useState<any>([]);

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

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Typography variant="h6" style={{ margin: "10px", marginLeft: "15px" }}>
        My routes
      </Typography>
      <List>
        {[...routes].map((route) => (
          <ListItem disablePadding onClick={() => handleViewRouteInfo(route)}>
            <ListItemButton>
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
      <Drawer anchor={"right"} open={isOpen} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
};

export default SideMenu;
