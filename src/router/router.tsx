import { createBrowserRouter } from "react-router-dom";
import { HomePage, ExamPage } from "../pages";

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
