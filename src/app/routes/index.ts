import { createBrowserRouter } from "react-router-dom";
import publicRoutes from "./publicRoutes";

export const router = createBrowserRouter(publicRoutes.concat([]));
