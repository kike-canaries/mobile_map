import React from "react";
import { render } from "@testing-library/react";
import ChangeMapView from "..";
import { ChangeMapViewProps } from "../ChangeMapView";
import { trackData } from "../../../mocks/trackDataMocks";
import { MapContainer } from "react-leaflet";
import { layerGroup } from "leaflet";

jest.mock("leaflet", () => {
  return {
    __esModule: true,
    A: true,
    layerGroup: jest.fn().mockReturnValue({
      clearLayers: jest.fn(),
      addLayer: jest.fn().mockReturnValue({
        addTo: jest.fn(),
      }),
    }),
    polyline: jest.fn().mockReturnValue({
      getBounds: jest.fn(),
    }),
    Map: jest.fn().mockImplementation(() => {
      return {
        fitBounds: jest.fn(),
      };
    }),
    LatLng: jest.fn().mockImplementation(() => {
      return {};
    }),
    // eslint-disable-next-line react/display-name
    default: () => {
      return null;
    },
  };
});

describe("ChangeMapView", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const mockProps: ChangeMapViewProps = {
    positions: trackData.data,
  };
  it("should render without error", () => {
    render(
      <MapContainer>
        <ChangeMapView {...mockProps} />
      </MapContainer>
    );
  });

  it("should clear layers", () => {
    render(
      <MapContainer>
        <ChangeMapView {...mockProps} />
      </MapContainer>
    );

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(layerGroup().clearLayers).toHaveBeenCalledTimes(1);
  });
});
