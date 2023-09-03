import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Trains = lazy(() => import("./pages/displayTrains"));
const TrainDetails = lazy(() => import("./pages/trainDetails"));

const router = createBrowserRouter([
  { path: "/", element: <Trains /> },
  { path: "/train/:trainNumber", element: <TrainDetails /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
