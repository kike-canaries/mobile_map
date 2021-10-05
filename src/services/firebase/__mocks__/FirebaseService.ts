import { trackData } from "../../../mocks/trackDataMocks";
import { trackInfoList } from "../../../mocks/trackInfoMocks";

export const mockGetTrackInfoList = jest.fn().mockResolvedValue(trackInfoList);
export const mockGetTrackData = jest.fn().mockResolvedValue(trackData.data);

const mock = jest.fn().mockImplementation(() => {
  return {
    initFirebaseApp: jest.fn(),
    getTrackInfoList: mockGetTrackInfoList,
    getTrackData: mockGetTrackData,
  };
});

export default mock;
