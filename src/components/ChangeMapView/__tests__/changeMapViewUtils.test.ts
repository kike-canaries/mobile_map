import { getColor } from "../changeMapViewUtils";

describe("Change view map utils", () => {
  it("should return #584949 color when value is greater than 250", () => {
    const expectedColor = "#584949";
    const testValue = 300;
    const resultColor = getColor(testValue);

    expect(resultColor).toBe(expectedColor);
  });

  it("should return #187218 color when value is less than 13", () => {
    const expectedColor = "#187218";
    const testValue = 12;
    const resultColor = getColor(testValue);

    expect(resultColor).toBe(expectedColor);
  });

  it("should return #E8E372 color when value is less than 35", () => {
    const expectedColor = "#E8E372";
    const testValue = 34;
    const resultColor = getColor(testValue);

    expect(resultColor).toBe(expectedColor);
  });

  it("should return #FFA500 color when value is less than 55", () => {
    const expectedColor = "#FFA500";
    const testValue = 54;
    const resultColor = getColor(testValue);

    expect(resultColor).toBe(expectedColor);
  });

  it("should return #F00 color when value is less than 150", () => {
    const expectedColor = "#F00";
    const testValue = 149;
    const resultColor = getColor(testValue);

    expect(resultColor).toBe(expectedColor);
  });

  it("should return #950AD7 color when value is less than 250", () => {
    const expectedColor = "#950AD7";
    const testValue = 249;
    const resultColor = getColor(testValue);

    expect(resultColor).toBe(expectedColor);
  });
});
