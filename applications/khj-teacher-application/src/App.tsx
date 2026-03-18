import { Global, css } from "@emotion/react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5분
      retry: 1, // 실패 시 1회 재시도
    },
    mutations: {
      retry: 0, // 실패 시 1회 재시도
    },
  },
});

const globalStyle = css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    background: #e6e8ea;
  }
`;

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Global styles={globalStyle} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
