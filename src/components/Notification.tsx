import React from "react";
import type { NotificationType } from "../utils/types";

interface Props {
  notification: NotificationType;
  onClose: () => void;
}

export const Notification: React.FC<Props> = ({ notification, onClose }) => {
  return (
    <div className={`notification ${notification.type}`}>
      <p>{notification.message}</p>
      <button onClick={onClose}>X</button>
    </div>
  );
};
