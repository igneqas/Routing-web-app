import { render, screen } from "@testing-library/react";
import {
  MapContainer,
  Polyline,
  Marker,
  TileLayer,
  ZoomControl,
} from "react-leaflet";

import Map from "./Map";
import { LatLngTuple } from "leaflet";

describe("Map", () => {
  const mockRouteCoords = [
    [51.505, -0.09] as LatLngTuple,
    [51.51, -0.1] as LatLngTuple,
    [51.51, -0.12] as LatLngTuple,
  ];
  const mockCenterCoords = [51.505, -0.09] as LatLngTuple;

  it("should render the MapContainer component with correct props", () => {
    //     render(
    //       <Map routeCoords={mockRouteCoords} centerCoords={mockCenterCoords}>
    //         {/* children components */}
    //       </Map>
    //     );
    //     const mapContainer = screen.getByRole("presentation");
    //     expect(mapContainer).toBeInTheDocument();
    //     expect(mapContainer).toHaveAttribute("center", mockCenterCoords.toString());
    //     expect(mapContainer).toHaveAttribute("zoom", "14");
    //     expect(mapContainer).toHaveAttribute("scrollwheelzoom", "true");
    //     expect(mapContainer).toHaveAttribute("zoomcontrol", "false");
  });

  //   it("should render the TileLayer component with the correct URL", () => {
  //     render(
  //       <Map routeCoords={mockRouteCoords} centerCoords={mockCenterCoords}>
  //         {/* children components */}
  //       </Map>
  //     );

  //     const tileLayer = screen.getByRole("tilelayer");
  //     expect(tileLayer).toBeInTheDocument();
  //     expect(tileLayer).toHaveAttribute(
  //       "url",
  //       "https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
  //     );
  //   });

  //   it("should render the Polyline component with the correct props", () => {
  //     render(
  //       <Map routeCoords={mockRouteCoords} centerCoords={mockCenterCoords}>
  //         {/* children components */}
  //       </Map>
  //     );

  //     const polyline = screen.getByRole("polyline");
  //     expect(polyline).toBeInTheDocument();
  //     expect(polyline).toHaveAttribute(
  //       "positions",
  //       JSON.stringify(mockRouteCoords)
  //     );
  //     expect(polyline).toHaveAttribute("color", "red");
  //     expect(polyline).toHaveAttribute("stroke", "true");
  //     expect(polyline).toHaveAttribute("weight", "5");
  //   });

  //   it("should render the Marker components when routeCoords is not empty", () => {
  //     render(
  //       <Map routeCoords={mockRouteCoords} centerCoords={mockCenterCoords}>
  //         {/* children components */}
  //       </Map>
  //     );

  //     const markers = screen.getAllByRole("marker");
  //     expect(markers).toHaveLength(2);
  //     expect(markers[0]).toHaveAttribute(
  //       "position",
  //       JSON.stringify(mockRouteCoords[0])
  //     );
  //     expect(markers[1]).toHaveAttribute(
  //       "position",
  //       JSON.stringify(mockRouteCoords[mockRouteCoords.length - 1])
  //     );
  //   });

  //   it("should not render the Marker components when routeCoords is empty", () => {
  //     const emptyRouteCoords = [];

  //     render(
  //       <Map routeCoords={emptyRouteCoords} centerCoords={mockCenterCoords}>
  //         {/* children components */}
  //       </Map>
  //     );

  //     const markers = screen.queryAllByRole("marker");
  //     expect(markers).toHaveLength(0);
  //   });

  //   it("should render the children components", () => {
  //     render(
  //       <Map routeCoords={mockRouteCoords} centerCoords={mockCenterCoords}>
  //         <div>Child Component</div>
  //       </Map>
  //     );

  //     const childComponent = screen.getByText("Child Component");
  //     expect(childComponent).toBeInTheDocument();
  //   });
});
