import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Toaster } from "./components/ui/sonner";
import { AssessmentContextProvider } from "./context/AssessmentContext";
import { AuthProvider } from "./context/AuthContext";
import { GlobalContextProvider } from "./context/GlobalContext";
import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GlobalContextProvider>
          <AssessmentContextProvider>
            <App />
            <Toaster richColors position="top-right" />
          </AssessmentContextProvider>
        </GlobalContextProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
