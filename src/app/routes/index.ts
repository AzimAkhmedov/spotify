import { createBrowserRouter } from "react-router-dom";
import publicRoutes from "./publicRoutes";

import privateRoutes from "./privateRoutes";
import cookies from "js-cookie";

export const router = createBrowserRouter(
  cookies.get("auth-spot") ? privateRoutes : publicRoutes
);

