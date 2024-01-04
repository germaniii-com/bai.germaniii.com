import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./home/Home";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <h2>Register Page</h2>,
  },
  {
    path: "/chat",
    element: <h2>Chat Page</h2>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
