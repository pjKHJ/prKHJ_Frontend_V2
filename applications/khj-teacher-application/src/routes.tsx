import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SingUp";
import AddStudent from "./pages/AddStudent";
import DeleteStudent from "./pages/DeleteStudent";
import List from "./pages/List";
import { Layout } from "@khj/user-interfaces";
import Entry from "./pages/Entry";

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
        path: "entry",
        element: <Entry />,
        path: "delete-student",
        element: <DeleteStudent />,
      },
      {
        path: "list",
        element: <List />,
      },
      {
        path: "*",
        element: <div>Not Found</div>,
      },
    ],
  },
]);
