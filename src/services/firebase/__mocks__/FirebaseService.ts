import { trackPositions } from "../../../mocks/trackDataMocks";
import { trackInfoList } from "../../../mocks/trackInfoMocks";

export const mockGetTrackInfoList = jest.fn().mockResolvedValue(trackInfoList);
export const mockGetTrackPositions = jest
  .fn()
  .mockResolvedValue(trackPositions);

const mock = jest.fn().mockImplementation(() => {
  return {
    initFirebaseApp: jest.fn(),
    getTrackInfoList: mockGetTrackInfoList,
    getTrackPositions: mockGetTrackPositions,
  };
});

export default mock;
