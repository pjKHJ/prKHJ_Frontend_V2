import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AddStudent from "./pages/AddStudent";
import DeleteStudent from "./pages/DeleteStudent";
import List from "./pages/List";
import { Layout } from "@khj/user-interfaces";
import Entry from "./pages/Entry";
import Detail from "./pages/Detail";
import { RequireAuth, RequireGuest } from "./RouteGuards";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/entry" replace />,
      },
      {
        element: <RequireGuest />,
        children: [
          {
            path: "entry",
            element: <Entry />,
          },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "signup",
            element: <SignUp />,
          },
        ],
      },
      {
        element: <RequireAuth />,
        children: [
          {
            path: "add-student",
            element: <AddStudent />,
          },
          {
            path: "delete-student",
            element: <DeleteStudent />,
          },
          {
            path: "list",
            element: <List />,
          },
          {
            path: "dashboard/:id",
            element: <Detail />,
          },
        ],
      },
      {
        path: "*",
        element: <Navigate to="/entry" replace />,
      },
    ],
  },
]);
