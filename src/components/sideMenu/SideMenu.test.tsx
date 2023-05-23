import { render, screen, fireEvent } from "@testing-library/react";
import SideMenu from "./SideMenu";
import "@testing-library/jest-dom";

describe("SideMenu", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render the "View saved routes" button', () => {
    render(<SideMenu handleViewRouteInfo={jest.fn()} />);

    const viewRoutesButton = screen.getByRole("button", {
      name: "View saved routes",
    });
    expect(viewRoutesButton).toBeInTheDocument();
  });

  it('should render the "Sign Out" button', () => {
    render(<SideMenu handleViewRouteInfo={jest.fn()} />);

    const signOutButton = screen.getByRole("button", { name: "Sign Out" });
    expect(signOutButton).toBeInTheDocument();
  });

  it('should open the drawer when "View saved routes" button is clicked', () => {
    render(<SideMenu handleViewRouteInfo={jest.fn()} />);

    const viewRoutesButton = screen.getByRole("button", {
      name: "View saved routes",
    });
    fireEvent.click(viewRoutesButton);

    const drawer = screen.getAllByRole("presentation")[0];
    expect(drawer).toHaveClass("MuiDrawer-root");
  });
});
