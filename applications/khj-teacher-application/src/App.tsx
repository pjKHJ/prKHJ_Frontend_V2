import { Global, css } from "@emotion/react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

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
    <>
      <Global styles={globalStyle} />
      <RouterProvider router={router} />
    </>
  );
}
