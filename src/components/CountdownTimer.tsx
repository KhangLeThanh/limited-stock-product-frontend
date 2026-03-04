import React, { useEffect, useState } from "react";

interface Props {
  expiresAt: string;
  onExpire: () => void;
}

const CountdownTimer: React.FC<Props> = ({ expiresAt, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState(
    () => new Date(expiresAt).getTime() - Date.now()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = new Date(expiresAt).getTime() - Date.now();
      setTimeLeft(diff);
      if (diff <= 0) {
        clearInterval(interval);
        onExpire();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt, onExpire]);

  if (timeLeft <= 0) return <p>Reservation expired</p>;

  const minutes = Math.floor(timeLeft / 1000 / 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <p>
      Time left: {minutes}m {seconds}s
    </p>
  );
};

export default CountdownTimer;
