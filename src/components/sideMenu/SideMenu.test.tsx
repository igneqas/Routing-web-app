import { render, screen, fireEvent } from "@testing-library/react";
import SideMenu from "./SideMenu";
import "@testing-library/jest-dom";

describe("SideMenu", () => {
  const mockRoutes = [
    { id: 1, name: "Route 1", dateCreated: "2023-05-01" },
    { id: 2, name: "Route 2", dateCreated: "2023-05-02" },
  ];

  //   beforeEach(() => {
  //     jest.spyOn(window, "fetch").mockResolvedValue({
  //       json: jest.fn().mockResolvedValue(mockRoutes),
  //       status: 200,
  //     });
  //   });

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

  //   it("should render the list of saved routes in the drawer", async () => {
  //     render(<SideMenu handleViewRouteInfo={jest.fn()} />);

  //     const viewRoutesButton = screen.getByRole("button", {
  //       name: "View saved routes",
  //     });
  //     fireEvent.click(viewRoutesButton);

  //     const route1 = await screen.findByText("Route 1");
  //     const route2 = await screen.findByText("Route 2");
  //     expect(route1).toBeInTheDocument();
  //     expect(route2).toBeInTheDocument();
  //   });

  //   it("should call handleViewRouteInfo when a route is clicked", async () => {
  //     const handleViewRouteInfo = jest.fn();
  //     render(<SideMenu handleViewRouteInfo={handleViewRouteInfo} />);

  //     const viewRoutesButton = screen.getByRole("button", {
  //       name: "View saved routes",
  //     });
  //     fireEvent.click(viewRoutesButton);

  //     const route1 = await screen.findByText("Route 1");
  //     fireEvent.click(route1);

  //     expect(handleViewRouteInfo).toHaveBeenCalledTimes(1);
  //     expect(handleViewRouteInfo).toHaveBeenCalledWith(mockRoutes[0]);
  //   });

  //   it("should call handleDeleteRoute when the delete button is clicked", async () => {
  //     jest.spyOn(window, "fetch").mockResolvedValueOnce({
  //       status: 200,
  //     });

  //     const handleDeleteRoute = jest.fn();
  //     render(<SideMenu handleViewRouteInfo={jest.fn()} />);

  //     const viewRoutesButton = screen.getByRole("button", {
  //       name: "View saved routes",
  //     });
  //     fireEvent.click(viewRoutesButton);

  //     const deleteButton = await screen.findByLabelText("delete");
  //     fireEvent.click(deleteButton);

  //     expect(handleDeleteRoute).toHaveBeenCalledTimes(1);
  //     expect(handleDeleteRoute).toHaveBeenCalledWith(mockRoutes[0]);
  //   });

  //   it('should call signOut when "Sign Out" button is clicked', () => {
  //     const signOutMock = jest.spyOn(window, "signOut");
  //     render(<SideMenu handleViewRouteInfo={jest.fn()} />);

  //     const signOutButton = screen.getByRole("button", { name: "Sign Out" });
  //     fireEvent.click(signOutButton);

  //     expect(signOutMock).toHaveBeenCalledTimes(1);
  //   });
});
