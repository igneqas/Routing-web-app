import { render, screen, fireEvent } from "@testing-library/react";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "@testing-library/jest-dom";

import LocationChangeRow, { LocationChangeRowProps } from "./LocationChangeRow";

describe("LocationChangeRow", () => {
  const mockSetLocations = jest.fn();
  const mockProps: LocationChangeRowProps = {
    setLocations: mockSetLocations,
    inputCount: 3,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render Remove button when inputCount is greater than 2", () => {
    render(<LocationChangeRow {...mockProps} />);

    const removeButton = screen.getByTestId("RemoveIcon");
    expect(removeButton).toBeInTheDocument();
  });

  it("should not render Remove button when inputCount is less than or equal to 2", () => {
    const props: LocationChangeRowProps = {
      ...mockProps,
      inputCount: 2,
    };

    render(<LocationChangeRow {...props} />);

    const removeButton = screen.queryByTestId("RemoveIcon");
    expect(removeButton).not.toBeInTheDocument();
  });

  it("should call setLocations with updated location list when Remove button is clicked", () => {
    render(<LocationChangeRow {...mockProps} />);

    const removeButton = screen.getByTestId("RemoveIcon");
    fireEvent.click(removeButton);

    expect(mockSetLocations).toHaveBeenCalledTimes(1);
  });

  it("should call setLocations with updated location list when Add button is clicked", () => {
    render(<LocationChangeRow {...mockProps} />);

    const addButton = screen.getByTestId("AddIcon");
    fireEvent.click(addButton);

    expect(mockSetLocations).toHaveBeenCalledTimes(1);
  });
});
