import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { LimitedDropPage } from "./pages/LimitedDropPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { Box } from "@mui/material";

const queryClient = new QueryClient();

const Main: React.FC = () => {
  const { user } = useAuth();
  const [showSignup, setShowSignup] = useState(false);

  if (!user) {
    return showSignup ? (
      <SignupPage />
    ) : (
      <LoginPage toggleSignup={() => setShowSignup(true)} />
    );
  }

  return <LimitedDropPage />;
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Main />
        </Box>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
