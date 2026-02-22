import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SingUp";
import AddStudent from "./pages/AddStudent";
import { Layout } from "@khj/user-interfaces";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <div>Home</div>,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "add-student",
        element: <AddStudent />,
      },
      {
        path: "*",
        element: <div>Not Found</div>,
      },
    ],
  },
]);
