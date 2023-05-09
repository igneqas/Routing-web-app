import { render } from "@testing-library/react";
import { useMap } from "react-leaflet";
import MapView, { MapViewProps } from "./MapView";
import { LatLngTuple } from "leaflet";

jest.mock("react-leaflet", () => ({
  useMap: jest.fn(),
}));

describe("MapView", () => {
  const mockCenterCoords = [51.505, -0.09] as LatLngTuple;
  const mockUseMap = useMap as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call useMap hook", () => {
    const mockMap = {
      setView: jest.fn(),
      getZoom: jest.fn(),
    };
    mockUseMap.mockReturnValue(mockMap);
    render(<MapView centerCoords={mockCenterCoords} />);
    expect(mockUseMap).toHaveBeenCalledTimes(1);
  });

  it("should call setView on map object when centerCoords prop changes", () => {
    const mockMap = {
      setView: jest.fn(),
      getZoom: jest.fn(),
    };
    mockUseMap.mockReturnValue(mockMap);

    const props: MapViewProps = {
      centerCoords: mockCenterCoords,
    };

    render(<MapView {...props} />);

    expect(mockMap.setView).toHaveBeenCalledTimes(1);
    expect(mockMap.setView).toHaveBeenCalledWith(
      mockCenterCoords,
      mockMap.getZoom()
    );
  });

  it("should not call setView on map object when centerCoords prop does not change", () => {
    const mockMap = {
      setView: jest.fn(),
      getZoom: jest.fn(),
    };
    mockUseMap.mockReturnValue(mockMap);

    const props: MapViewProps = {
      centerCoords: mockCenterCoords,
    };

    const { rerender } = render(<MapView {...props} />);

    rerender(<MapView {...props} />);

    expect(mockMap.setView).toHaveBeenCalledTimes(1);
  });
});
