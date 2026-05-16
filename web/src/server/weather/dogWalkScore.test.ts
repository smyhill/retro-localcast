import { describe, expect, it } from "vitest";
import { getDogWalkRecommendation } from "./dogWalkScore";

describe("getDogWalkRecommendation", () => {
  it("lowers the score for rain", () => {
    const recommendation = getDogWalkRecommendation({
      hourly: [
        {
          startTime: "2026-05-16T18:00:00-04:00",
          temperature: 70,
          condition: "Rain Showers",
          precipitationChance: 65,
          windSpeed: "6 mph",
        },
      ],
    });

    expect(recommendation.score).toBeLessThan(8);
    expect(recommendation.reason.toLowerCase()).toContain("rain");
  });

  it("lowers the score for extreme heat", () => {
    const recommendation = getDogWalkRecommendation({
      hourly: [
        {
          startTime: "2026-07-20T15:00:00-04:00",
          temperature: 96,
          condition: "Sunny",
          precipitationChance: 0,
          windSpeed: "5 mph",
        },
      ],
    });

    expect(recommendation.score).toBeLessThanOrEqual(7);
    expect(recommendation.reason).toContain("very hot");
  });

  it("scores a comfortable dry evening highly", () => {
    const recommendation = getDogWalkRecommendation({
      hourly: [
        {
          startTime: "2026-05-16T18:00:00-04:00",
          temperature: 72,
          condition: "Mostly Sunny",
          precipitationChance: 0,
          windSpeed: "5 mph",
        },
      ],
    });

    expect(recommendation.score).toBeGreaterThanOrEqual(9);
    expect(recommendation.bestWindow).toBe("6 PM - 7 PM");
  });

  it("lowers the score for high wind", () => {
    const recommendation = getDogWalkRecommendation({
      hourly: [
        {
          startTime: "2026-05-16T18:00:00-04:00",
          temperature: 68,
          condition: "Partly Cloudy",
          precipitationChance: 0,
          windSpeed: "28 mph",
        },
      ],
    });

    expect(recommendation.score).toBeLessThanOrEqual(8);
    expect(recommendation.reason).toContain("winds are strong");
  });
});
