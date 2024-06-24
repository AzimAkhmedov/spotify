import { RouteObject } from "react-router-dom";
import { AuthPage } from "@/pages";
// const routes = createBrowserRouter(

// )

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <AuthPage />,
  },
];

export default publicRoutes;
