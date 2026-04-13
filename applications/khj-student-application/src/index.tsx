import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";

// console 로그/에러를 프로덕션에서 숨기기
if (import.meta.env && import.meta.env.PROD) {
  const noop = () => {};
  // console.log = noop;
  console.error = noop;
}

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Failed to find the root element");
}
const root = createRoot(rootElement);
const queryClient = new QueryClient();
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
