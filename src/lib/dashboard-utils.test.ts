import { describe, expect, it } from "vitest";
import { computeDeviceShare, formatScanCount } from "./dashboard-utils";

describe("computeDeviceShare", () => {
  it("computes rounded percentages that reflect each device's share", () => {
    const result = computeDeviceShare([
      { device: "iPhone", scans: 1200 },
      { device: "Android", scans: 700 },
      { device: "Desktop", scans: 100 },
    ]);

    expect(result).toEqual([
      { device: "iPhone", percentage: 60 },
      { device: "Android", percentage: 35 },
      { device: "Desktop", percentage: 5 },
    ]);
  });

  it("returns 0% for every device when there are no scans instead of dividing by zero", () => {
    const result = computeDeviceShare([
      { device: "iPhone", scans: 0 },
      { device: "Android", scans: 0 },
    ]);

    expect(result).toEqual([
      { device: "iPhone", percentage: 0 },
      { device: "Android", percentage: 0 },
    ]);
  });

  it("returns an empty array for empty input", () => {
    expect(computeDeviceShare([])).toEqual([]);
  });
});

describe("formatScanCount", () => {
  it("adds thousands separators", () => {
    expect(formatScanCount(3900)).toBe("3,900");
    expect(formatScanCount(2140)).toBe("2,140");
  });

  it("leaves small numbers untouched", () => {
    expect(formatScanCount(14)).toBe("14");
    expect(formatScanCount(0)).toBe("0");
  });
});
