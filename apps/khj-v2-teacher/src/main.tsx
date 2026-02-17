import React from "react";
import { Global, css } from "@emotion/react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

const globalStyle = css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Global styles={globalStyle} />
    <RouterProvider router={router} />
  </React.StrictMode>
);
