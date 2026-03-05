import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { LimitedDropPage } from "./pages/LimitedDropPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";

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
        <Main />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
