import { useEffect } from "react";

import "./styles/App.css";
import "./styles/index.css";

import { specifyTheme } from "@/shared/utils";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { CookiesProvider, useCookies } from "react-cookie";
import { GoogleOAuthProvider } from "@react-oauth/google";

import store from "./store";
import { router } from "./routes";
import { Toaster } from "@/shared/components/ui/toaster";
import cookies from "js-cookie";

import { IUserResponse } from "@/entities/user";

function App() {
  // const [cookies] = useCookies(["auth-spot"]);

  useEffect(() => {
    const user = cookies.get("auth-spot")

    if (user) {
      console.log("cookies: ", user);
    }
    specifyTheme();
  }, []);

  return (
    <Provider store={store}>
      <CookiesProvider>
        <GoogleOAuthProvider clientId="219155830420-558nie9v8pghq07ujsja2p1345t5p6gb.apps.googleusercontent.com">
          <main className="container mx-auto">
            <RouterProvider router={router} />
            <Toaster />
          </main>
        </GoogleOAuthProvider>
      </CookiesProvider>
    </Provider>
  );
}

export default App;
