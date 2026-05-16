"use client";

import { useEffect, useState } from "react";

function formatTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
}

export function RetroClock() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const firstTick = window.setTimeout(() => {
      setTime(formatTime(new Date()));
    }, 0);
    const timer = window.setInterval(() => {
      setTime(formatTime(new Date()));
    }, 1000);

    return () => {
      window.clearTimeout(firstTick);
      window.clearInterval(timer);
    };
  }, []);

  return (
    <div className="font-mono text-2xl font-black tabular-nums text-amber-300 sm:text-3xl">
      {time}
    </div>
  );
}
