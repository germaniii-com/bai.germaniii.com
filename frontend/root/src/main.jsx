import React from "react";
import ReactDOM from "react-dom/client";
import App from "./home/App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
