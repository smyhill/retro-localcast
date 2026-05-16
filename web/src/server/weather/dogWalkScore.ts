export type DogWalkRecommendation = {
  bestWindow: string;
  score: number;
  reason: string;
};

export type DogWalkForecastInput = {
  hourly: Array<{
    startTime: string;
    temperature: number;
    condition: string;
    precipitationChance?: number;
    windSpeed?: string;
  }>;
};

type ScoredWindow = {
  startTime: string;
  score: number;
  reasons: string[];
};

export function getDogWalkRecommendation(
  input: DogWalkForecastInput,
): DogWalkRecommendation {
  const scoredWindows = input.hourly.map(scoreWindow);
  const bestWindow = scoredWindows.toSorted((a, b) => b.score - a.score)[0];

  if (!bestWindow) {
    return {
      bestWindow: "Check back later",
      score: 0,
      reason: "Hourly forecast data is not available yet.",
    };
  }

  return {
    bestWindow: formatWindow(bestWindow.startTime),
    score: bestWindow.score,
    reason: summarizeReasons(bestWindow),
  };
}

function scoreWindow(
  window: DogWalkForecastInput["hourly"][number],
): ScoredWindow {
  let score = 10;
  const reasons: string[] = [];
  const rainChance = window.precipitationChance ?? 0;
  const windSpeed = parseWindSpeed(window.windSpeed);
  const condition = window.condition.toLowerCase();
  const hour = new Date(window.startTime).getHours();

  if (rainChance >= 70 || condition.includes("thunder")) {
    score -= 5;
    reasons.push("storms or heavy rain are likely");
  } else if (rainChance >= 40 || condition.includes("rain")) {
    score -= 4;
    reasons.push("rain chances are elevated");
  } else if (rainChance >= 20) {
    score -= 1;
    reasons.push("there is a small rain chance");
  }

  if (window.temperature >= 90) {
    score -= 4;
    reasons.push("it is very hot");
  } else if (window.temperature >= 84) {
    score -= 2;
    reasons.push("it is warm");
  } else if (window.temperature <= 25) {
    score -= 4;
    reasons.push("it is very cold");
  } else if (window.temperature <= 38) {
    score -= 2;
    reasons.push("it is chilly");
  } else {
    reasons.push("temperatures are comfortable");
  }

  if (windSpeed >= 25) {
    score -= 3;
    reasons.push("winds are strong");
  } else if (windSpeed >= 15) {
    score -= 1;
    reasons.push("winds are noticeable");
  }

  if (hour >= 7 && hour <= 19) {
    score += 1;
    reasons.push("there should be daylight");
  } else {
    score -= 1;
    reasons.push("it may be dark");
  }

  return {
    startTime: window.startTime,
    score: clampScore(score),
    reasons,
  };
}

function summarizeReasons(window: ScoredWindow) {
  const uniqueReasons = Array.from(new Set(window.reasons));
  const sentence = uniqueReasons.slice(0, 3).join(", ");

  return `${capitalize(sentence)}.`;
}

function parseWindSpeed(value?: string) {
  if (!value) {
    return 0;
  }

  const match = value.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

function formatWindow(startTime: string) {
  const start = new Date(startTime);
  const end = new Date(start.getTime() + 60 * 60 * 1000);
  const formatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
  });

  return `${formatter.format(start)} - ${formatter.format(end)}`;
}

function clampScore(score: number) {
  return Math.max(0, Math.min(10, score));
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
