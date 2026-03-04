import { useEffect, useState } from "react";

interface Props {
  expiresAt: string;
  onExpire?: () => void;
}

export const CountdownTimer = ({ expiresAt, onExpire }: Props) => {
  const [timeLeft, setTimeLeft] = useState(() => {
    const diff = new Date(expiresAt).getTime() - Date.now();
    return diff > 0 ? diff : 0;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = new Date(expiresAt).getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft(0);
        onExpire?.();
        clearInterval(interval);
      } else {
        setTimeLeft(diff);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt, onExpire]);

  const minutes = Math.floor(timeLeft / 1000 / 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <span>
      {minutes}:{seconds.toString().padStart(2, "0")}
    </span>
  );
};
