import { QueryClient, QueryClientProvider } from "react-query";
import LimitedDrop from "./pages/LimitedDrop";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LimitedDrop />
    </QueryClientProvider>
  );
}

export default App;
