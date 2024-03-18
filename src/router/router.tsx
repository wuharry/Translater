import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage, ExamPage } from "../pages";
import Home from "../App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/test",
    element: <ExamPage />,
  },
]);
