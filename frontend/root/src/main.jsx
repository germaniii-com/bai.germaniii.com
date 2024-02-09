import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./home/Home";
import Chat from "./chat/Chat";
import "./index.css";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import axiosInstance from "./utils/axiosInstance";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/chat/:conversationId?",
    loader: async () => {
      // const user = await axiosInstance
      //   .get("/auth/user")
      //   .then(() => true)
      //   .catch(() => false);

      // if (!user) {
      //   throw redirect("/");
      // }

      return null;
    },
    element: <Chat />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
