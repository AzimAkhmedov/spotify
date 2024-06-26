import { useEffect } from "react";

import "./styles/App.css";
import "./styles/index.css";
import { specifyTheme } from "@/shared/utils";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { Provider } from "react-redux";
import store from "./store";
function App() {
  useEffect(() => {
    specifyTheme();
  }, []);

  return (
    <Provider store={store}>
      <main className="container mx-auto">
        <RouterProvider router={router} />
      </main>
    </Provider>
  );
}

export default App;
