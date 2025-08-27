import { useState, useEffect } from "react";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeDifference());

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = getTimeDifference();
      if (
        newTime.days === 0 &&
        newTime.hours === 0 &&
        newTime.minutes === 0 &&
        newTime.seconds === 0
      ) {
        clearInterval(timer);
      }
      setTimeLeft(newTime);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="apply-flex">
      <p className="days time">{timeLeft.days} :</p>
      <p className="hours time">{timeLeft.hours} :</p>
      <p className="minutes time">{timeLeft.minutes} :</p>
      <p className="seconds time">{timeLeft.seconds}</p>
    </div>
  );
}

function getTimeDifference() {
  const endDate = new Date("2025-10-25T14:30:00");
  const now = new Date();

  let diffMs = endDate - now;

  if (diffMs <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  let diffSec = Math.floor(diffMs / 1000);
  const days = Math.floor(diffSec / (60 * 60 * 24));
  diffSec %= 60 * 60 * 24;
  const hours = Math.floor(diffSec / (60 * 60));
  diffSec %= 60 * 60;
  const minutes = Math.floor(diffSec / 60);
  const seconds = diffSec % 60;

  return { days, hours, minutes, seconds };
}
