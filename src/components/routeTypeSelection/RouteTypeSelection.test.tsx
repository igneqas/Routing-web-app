import { render, screen, fireEvent } from "@testing-library/react";
import RouteTypeSelection, {
  RouteTypeSelectionProps,
} from "./RouteTypeSelection";

describe("RouteTypeSelection", () => {
  const mockChangeHandler = jest.fn();

  const mockProps: RouteTypeSelectionProps = {
    changeHandler: mockChangeHandler,
    isMobileDevice: false,
  };

  beforeEach(() => {
    render(<RouteTypeSelection {...mockProps} />);
  });

  it("should render toggle buttons with the correct labels", () => {
    expect(
      screen.getByRole("button", { name: "Quickest" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Leisure" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Shortest" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Pollution-free" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Mountain bike" })
    ).toBeInTheDocument();
  });

  it("should call the changeHandler function with the selected value", () => {
    const quickestButton = screen.getByRole("button", { name: "Quickest" });
    const shortestButton = screen.getByRole("button", { name: "Shortest" });

    fireEvent.click(quickestButton);
    expect(mockChangeHandler).toHaveBeenCalledWith("vm-forum-liegerad-schnell");

    fireEvent.click(shortestButton);
    expect(mockChangeHandler).toHaveBeenCalledWith("shortest");
  });
});
