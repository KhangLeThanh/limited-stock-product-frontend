// src/components/CountdownTimer.tsx
import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";

interface CountdownTimerProps {
  expiresAt: string;
  onExpire: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  expiresAt,
  onExpire,
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const targetTime = new Date(expiresAt).getTime();

    const updateTime = () => {
      const now = Date.now();
      const diff = targetTime - now;
      setTimeLeft(diff > 0 ? diff : 0);

      if (diff <= 0) {
        onExpire();
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [expiresAt, onExpire]);

  const minutes = Math.floor(timeLeft / 1000 / 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  if (timeLeft <= 0) return null;

  return (
    <Typography variant="subtitle1" color="secondary" sx={{ mt: 2 }}>
      Reservation expires in: {minutes}:{seconds.toString().padStart(2, "0")}
    </Typography>
  );
};

export default CountdownTimer;
