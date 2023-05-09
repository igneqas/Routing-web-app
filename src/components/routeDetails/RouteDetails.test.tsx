import { render, screen, fireEvent } from "@testing-library/react";
import RouteDetails, {
  RouteDetailsObject,
  RouteDetailsParams,
} from "./RouteDetails";
import "@testing-library/jest-dom";

describe("RouteDetails", () => {
  const mockRouteDetails: RouteDetailsObject = {
    distance: 1000,
    time: 60,
    ascend: 200,
    type: "Quickest",
    name: "Route 1",
  };

  const mockHandleSaveSubmit = jest.fn();

  const mockParams: RouteDetailsParams = {
    routeDetails: mockRouteDetails,
    isLoggedIn: true,
    handleSaveSubmit: mockHandleSaveSubmit,
  };

  it("should render route details correctly", () => {
    render(<RouteDetails {...mockParams} />);

    expect(
      screen.getByText(`Route: ${mockRouteDetails.name}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Mode: ${mockRouteDetails.type}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `Distance: ${(mockRouteDetails.distance / 1000).toFixed(2)} km`
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `Travel time: ${(mockRouteDetails.time / 60).toFixed(0)} min`
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Ascend: ${mockRouteDetails.ascend} m`)
    ).toBeInTheDocument();
  });

  it("should render save route button and open modal when logged in and name is not present", () => {
    const paramsWithoutName = {
      ...mockParams,
      routeDetails: { ...mockRouteDetails, name: undefined },
    };
    render(<RouteDetails {...paramsWithoutName} />);

    const saveRouteButton = screen.getByText("Save route");
    fireEvent.click(saveRouteButton);

    expect(saveRouteButton).toBeInTheDocument();
    expect(screen.getByRole("presentation")).toBeInTheDocument();
  });

  it("should not render save route button when not logged in", () => {
    const paramsWithoutLogin = {
      ...mockParams,
      isLoggedIn: false,
    };

    render(<RouteDetails {...paramsWithoutLogin} />);

    const saveRouteButton = screen.queryByRole("button", {
      name: "Save route",
    });
    expect(saveRouteButton).not.toBeInTheDocument();
  });

  it("should not render save route button when name is present", () => {
    render(<RouteDetails {...mockParams} />);

    const saveRouteButton = screen.queryByText("Save route");
    expect(saveRouteButton).not.toBeInTheDocument();
  });
});
