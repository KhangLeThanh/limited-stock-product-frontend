import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { LimitedDropPage } from "./pages/LimitedDropPage";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LimitedDropPage />
    </QueryClientProvider>
  );
};

export default App;
