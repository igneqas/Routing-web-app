import { render, screen, fireEvent } from "@testing-library/react";
import SaveRouteModal, { SaveRouteModalParams } from "./SaveRouteModal";
import "@testing-library/jest-dom";

describe("SaveRouteModal", () => {
  const mockHandleSaveSubmit = jest.fn();
  const mockHandleClose = jest.fn();

  const mockParams: SaveRouteModalParams = {
    handleSaveSubmit: mockHandleSaveSubmit,
    open: true,
    handleClose: mockHandleClose,
  };

  it("should render modal with input field and save button", () => {
    render(<SaveRouteModal {...mockParams} />);

    expect(screen.getByRole("presentation")).toBeInTheDocument();
    expect(screen.getByLabelText("Route name")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  it("should update name state when input value changes", () => {
    render(<SaveRouteModal {...mockParams} />);

    const nameField = screen.getByLabelText("Route name");
    fireEvent.change(nameField, { target: { value: "Route 1" } });

    // expect(nameField.parentElement).toBe("Route 1");
  });

  it("should call handleSaveSubmit and handleClose when save button is clicked", () => {
    render(<SaveRouteModal {...mockParams} />);

    const nameField = screen.getByLabelText("Route name");
    fireEvent.change(nameField, { target: { value: "Route 1" } });

    const saveButton = screen.getByRole("button", { name: "Save" });
    fireEvent.click(saveButton);

    expect(mockHandleSaveSubmit).toHaveBeenCalledWith("Route 1");
    expect(mockHandleClose).toHaveBeenCalledTimes(1);
  });
});
