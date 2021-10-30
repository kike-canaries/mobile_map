import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import Home from "../../../pages/index";
import { trackInfoList } from "../../../mocks/trackInfoMocks";
import * as FirebaseService from "../../../services/firebase/FirebaseService";
import * as MockFirebaseService from "../../../services/firebase/__mocks__/FirebaseService";
import * as HomeUtils from "../homeUtils";
jest.mock("../../../services/firebase/FirebaseService");
jest.mock("leaflet");

jest.mock("../homeUtils");

jest.mock("../../../components/Map", () => {
  return {
    __esModule: true,
    A: true,
    // eslint-disable-next-line react/display-name
    default: () => {
      return <div></div>;
    },
  };
});

const { mockGetTrackData } = FirebaseService as typeof MockFirebaseService;

describe("Home", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render without error", async () => {
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
      expect(mockGetTrackData).toHaveBeenCalled();
    });
  });

  it("should creat element to download track data", async () => {
    const buttonLabel = trackInfoList[0].name;
    const { getByText } = render(<Home />);

    await waitFor(() => {
      fireEvent.click(getByText(buttonLabel));
    });
    await waitFor(() => {
      fireEvent.click(getByText("Download"));

      expect(HomeUtils.downloadTrackData).toHaveBeenCalledTimes(1);
    });
  });
});
