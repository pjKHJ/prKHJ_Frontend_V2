import { Global, css } from "@emotion/react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

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
