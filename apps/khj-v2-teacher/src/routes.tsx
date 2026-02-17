import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

export const router = createBrowserRouter([
	{
		path: "/login",
		element: <Login />
	},
	{
		path: "/signup",
		element: <SignUp />
	} 
]);