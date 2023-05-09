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
    // await new Promise((r) => setTimeout(r, 2000));
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

  //   it("should display the provided locations in the autocomplete options", async () => {
  //     const locations = [
  //       { name: "New York", latitude: 40.7128, longitude: -74.006 },
  //       { name: "London", latitude: 51.5074, longitude: -0.1278 },
  //     ];

  //     mockProps.selectedLocation.name = "";
  //     mockProps.onChange = jest.fn((location) => {
  //       mockProps.selectedLocation.name = location.name;
  //       mockProps.selectedLocation.latitude = location.latitude;
  //       mockProps.selectedLocation.longitude = location.longitude;
  //     });

  //     render(<SearchBar {...mockProps} />);

  //     const inputElement = screen.getAllByRole("combobox")[0];

  //     fireEvent.change(inputElement, { target: { value: "Ne" } });

  //     await waitFor(() => {
  //       const options = screen.getAllByRole("option");
  //       expect(options).toHaveLength(1);
  //       expect(options[0]).toHaveTextContent("New York");

  //       fireEvent.click(options[0]);

  //       expect(mockOnChange).toHaveBeenCalledTimes(1);
  //       expect(mockOnChange).toHaveBeenCalledWith({
  //         name: "New York",
  //         latitude: 40.7128,
  //         longitude: -74.006,
  //       });
  //     });
  //   });
});
