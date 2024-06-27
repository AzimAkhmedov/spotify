import { useEffect } from "react";

import "./styles/App.css";
import "./styles/index.css";

import { specifyTheme } from "@/shared/utils";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { Provider } from "react-redux";
import { CookiesProvider, useCookies } from "react-cookie";

import store from "./store";
import { Toaster } from "@/shared/components/ui/toaster";
import { useAppDispatch } from "@/shared/hooks/reduxHooks";
import { IUserResponse, setUser } from "@/entities/user";
// import { IUserResponse, setUser } from "@/entities/user";

function App() {
  const [cookies, setCookie] = useCookies(["auth-spot"]);

  useEffect(() => {
    const user = cookies["auth-spot"] as IUserResponse;
    if (user) {
      console.log(user);
    }
    specifyTheme();
  }, []);

  return (
    <Provider store={store}>
      <CookiesProvider>
        <main className="container mx-auto">
          <RouterProvider router={router} />
          <Toaster />
        </main>
      </CookiesProvider>
    </Provider>
  );
}

export default App;
