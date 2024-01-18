import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./home/Home";
import Chat from "./chat/Chat";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/chat/:conversationId?",
    loader: async () => {
      // const user = await fake.getUser();
      // if (!user) {
      //   throw redirect("/login");
      // }
      // // otherwise continue
      // const stats = await fake.getDashboardStats();
      // return { user, stats };
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
