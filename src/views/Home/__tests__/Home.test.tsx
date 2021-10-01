import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import Home from "../../../pages/index";
import { trackInfoList } from "../../../mocks/trackInfoMocks";
import * as FirebaseService from "../../../services/firebase/FirebaseService";
import * as MockFirebaseService from "../../../services/firebase/__mocks__/FirebaseService";
jest.mock("../../../services/firebase/FirebaseService");
jest.mock("leaflet");

const { mockGetTrackPositions } = FirebaseService as typeof MockFirebaseService;

describe("Home", () => {
  it("Should render without error", async () => {
    const { getByTestId } = render(<Home />);
    const component = getByTestId("component-app");
    await waitFor(() => expect(component).toBeInTheDocument());
  });

  it("should render track information buttons", async () => {
    const expectedTrackInfoList = trackInfoList;
    const { getAllByTestId } = render(<Home />);

    await waitFor(() => {
      const components = getAllByTestId("button-track-info");
      expect(components.length).toEqual(expectedTrackInfoList.length);
    });
  });

  it("should get track positions when clicking on trackInfo button", async () => {
    const buttonLabel = trackInfoList[0].name;
    const { getByText } = render(<Home />);

    await waitFor(() => {
      fireEvent.click(getByText(buttonLabel));
      expect(mockGetTrackPositions).toHaveBeenCalled();
    });
  });
});
