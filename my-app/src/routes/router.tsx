import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Quiz from "../pages/Quiz";
import About from "../pages/About";
import Child from "../pages/Child";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/quiz",
    element: <Quiz />,
  },
  {
    path: "/about",
    element: <About />,
    children: [
      {
        path: "child",
        element: <Child />,
      },
    ],
  },
]);
