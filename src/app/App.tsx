import { useEffect } from "react";

import "./styles/App.css";
import "./styles/index.css";
import { specifyTheme } from "@/shared/utils";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
function App() {
  useEffect(() => {
    specifyTheme();
  }, []);

  return (
    <main className="container mx-auto">
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
