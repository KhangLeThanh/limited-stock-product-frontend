import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import type { NotificationType } from "../utils/types";

interface Props {
  notification: NotificationType | null;
  onClose: () => void;
}

export const Notification: React.FC<Props> = ({ notification, onClose }) => {
  if (!notification) return null;

  return (
    <Snackbar
      open={true}
      autoHideDuration={4000} // auto close after 4 seconds
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={onClose}
        severity={notification.type === "success" ? "success" : "error"}
        sx={{ width: "100%" }}
        variant="filled"
      >
        {notification.message}
      </Alert>
    </Snackbar>
  );
};
