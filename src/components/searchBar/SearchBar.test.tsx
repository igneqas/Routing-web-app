import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchBar, { SearchBarProps } from "./SearchBar";
import "@testing-library/jest-dom";
import { LocationObject } from "../../App";

describe("SearchBar", () => {
  const mockSelectedLocation: LocationObject = {
    name: "",
    latitude: "0",
    longitude: "0",
  };
  const mockOnChange = jest.fn();
  const mockSetIsActive = jest.fn();

  const mockProps: SearchBarProps = {
    selectedLocation: mockSelectedLocation,
    placeholder: "Search",
    onChange: mockOnChange,
    isMobileDevice: false,
    setIsActive: mockSetIsActive,
  };

  beforeEach(() => {
    render(<SearchBar {...mockProps} />);
  });

  it("should render the search input field with the provided placeholder", () => {
    const inputElement = screen.getByRole("combobox");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("placeholder", "Search");
  });

  it("should call the onChange function when the input value changes", async () => {
    const inputValue = "New York";
    const inputElement = screen.getByRole("combobox");

    fireEvent.change(inputElement, { target: { value: inputValue } });

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith({
        name: inputValue,
        longitude: undefined,
        latitude: undefined,
      });
    });
  });

  it("should call the setIsActive function when the input field is focused and blurred", () => {
    const inputElement = screen.getByRole("combobox");

    fireEvent.focus(inputElement);
    expect(mockSetIsActive).toHaveBeenCalledWith(true);

    fireEvent.blur(inputElement);
    expect(mockSetIsActive).toHaveBeenCalledWith(false);
  });

  it("should call the onChange function with an empty location object when the input value is cleared", async () => {
    const inputElement = screen.getByRole("combobox");

    fireEvent.change(inputElement, { target: { value: "" } });

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith({ name: "" });
    });
  });
});
