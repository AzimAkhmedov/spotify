import { RouteObject } from "react-router-dom";
import { HomePage } from "@/pages";
import MainLayout from "@/shared/layouts/MainLayout";

const privateRoutes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [{ path: "/", element: <HomePage /> }],
  },
];

export default privateRoutes;
