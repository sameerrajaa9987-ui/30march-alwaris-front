import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { queryClient } from "./app/queryClient";
import { TooltipProvider } from "./components/ui/tooltip";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/sonner";
import { ErrorBoundary } from "./shared/components/ErrorBoundary";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
              <BrowserRouter>
                <App />
              </BrowserRouter>
              <Toaster richColors closeButton position="top-right" />
            </ThemeProvider>
          </TooltipProvider>
        </QueryClientProvider>
      </Provider>
    </ErrorBoundary>
  </StrictMode>,
);
