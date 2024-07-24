import { useEffect, useState } from "react";
import { Input } from "@components/input";
import { Button } from "@components/button";
import { Alert, AlertDescription, AlertTitle } from "@components/alert";

import { FcGoogle } from "react-icons/fc";
import { FaSpotify, FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { RegisterRequest } from "@/shared/api/auth";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import {
  IUserResponse,
  getOAuthContextSpotifyThunk,
  getOAuthContextThunk,
  login,
} from "@/entities/user";
import { useToast } from "@/shared/components/ui/use-toast";
import { useGoogleLogin } from "@react-oauth/google";
import { useLocation } from "react-router-dom";
import axios from "axios";
import instance from "@/shared/api";

interface IFormInputs {
  email: string;
  password: string;
  repeatPassword: string;
}

const AuthForm = () => {
  const dispatch = useAppDispatch();
  const { hash } = useLocation();

  const loginState = useAppSelector((state) => state.user);
  const { toast } = useToast();

  const [pageMode, setPageMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false);

  const { control, handleSubmit } = useForm<IFormInputs>();

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      dispatch(getOAuthContextThunk(credentialResponse.access_token));
    },
    onError: () => {
      console.log("Login Failed");
    },
    scope: "email",
  });

  const handleLoginWithGoogle = () => loginWithGoogle();

  const onLoginSubmit: SubmitHandler<IFormInputs> = (data) => {
    if (loginState.authLoading) return;

    dispatch(login(data)).then((res) => {
      toast({
        title: "Welcome... " + (res.payload as IUserResponse).user.email,
        description: "You have successfully logged in",
      });
    });
  };
  const onRegisterSubmit: SubmitHandler<IFormInputs> = (data) => {
    if (data.password !== data.repeatPassword) {
      alert("Passwords should be same");
      return;
    }
    RegisterRequest(data).then((res) => console.log(res));
  };

  const loginWithSpotify = () => {
    // https://accounts.spotify.com/authorize?'
    window.location.href =
      "https://accounts.spotify.com/authorize?client_id=c5bb6541b3964b93b8b11ac1192d3e05&redirect_uri=http://localhost:5173/&response_type=token&response_type=code&scope=user-read-private user-read-email";
  };

  useEffect(() => {
    if (hash.split("=")[0] === "#access_token") {
      dispatch(getOAuthContextSpotifyThunk(hash.split("=")[1]));
    }
  }, [hash.split("=")[1]]);

  return pageMode === "login" ? (
    <form
      onSubmit={handleSubmit(onLoginSubmit)}
      className="h-full flex flex-col gap-4  items-center justify-center border rounded-xl p-5 min-w-[398px] mx-auto"
    >
      {loginState.authError && (
        <Alert variant="destructive">
          <AlertTitle>Error in login</AlertTitle>
          <AlertDescription>
            {loginState.authError || "Something went wrong"}
          </AlertDescription>
        </Alert>
      )}
      <Controller
        name="email"
        defaultValue={""}
        control={control}
        render={({ field }) => (
          <Input placeholder="Email" type="email" {...field} />
        )}
      />
      <div className="w-full relative">
        <Controller
          name="password"
          defaultValue={""}
          control={control}
          render={({ field }) => (
            <Input
              className="w-full pr-5"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              {...field}
            />
          )}
        />
        <div className="absolute flex items-center justify-center right-2 top-[50%] translate-y-[-50%] cursor-pointer w-[24px] h-[24px] rounded-full hover:bg-slate-500 text-gray-600 hover:text-white">
          {showPassword ? (
            <FaEyeSlash onClick={() => setShowPassword(false)} />
          ) : (
            <FaEye onClick={() => setShowPassword(true)} />
          )}
        </div>
      </div>
      <Button
        className="w-full"
        type="submit"
        disabled={loginState.authLoading}
      >
        Login
      </Button>
      <p className="text-gray-400 text-sm"> -- or -- </p>
      <div className="flex flex-col w-full gap-2">
        <Button
          className="w-full"
          type="button"
          onClick={handleLoginWithGoogle}
        >
          <span className="mr-1">Login using Google </span>
          <FcGoogle />
        </Button>
        <Button className="w-full" type="button" onClick={loginWithSpotify}>
          <span className="mr-1">Login using Spotify</span>{" "}
          <FaSpotify className="text-blue-700" />
        </Button>
      </div>
      <div>
        <p className="text-gray-400 text-sm">
          Still not member? Then{" "}
          <span
            className="underline font-bold text-white cursor-pointer"
            onClick={() => setPageMode("register")}
          >
            register here
          </span>
        </p>
      </div>
    </form>
  ) : (
    <form
      onSubmit={handleSubmit(onRegisterSubmit)}
      className="h-full flex flex-col gap-4  items-center justify-center border rounded-xl p-5 min-w-[398px] mx-auto"
    >
      <Controller
        name="email"
        defaultValue={""}
        control={control}
        render={({ field }) => (
          <Input placeholder="Email" type="email" {...field} />
        )}
      />
      <div className="w-full relative">
        <Controller
          name="password"
          defaultValue={""}
          control={control}
          render={({ field }) => (
            <Input
              className="w-full pr-5"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              {...field}
            />
          )}
        />
        <div className="absolute flex items-center justify-center right-2 top-[50%] translate-y-[-50%] cursor-pointer w-[24px] h-[24px] rounded-full hover:bg-slate-500 text-gray-600 hover:text-white">
          {showPassword ? (
            <FaEyeSlash onClick={() => setShowPassword(false)} />
          ) : (
            <FaEye onClick={() => setShowPassword(true)} />
          )}
        </div>
      </div>
      <div className="w-full relative">
        <Controller
          name="repeatPassword"
          defaultValue={""}
          control={control}
          render={({ field }) => (
            <Input
              className="w-full pr-5"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              {...field}
            />
          )}
        />
        <div className="absolute flex items-center justify-center right-2 top-[50%] translate-y-[-50%] cursor-pointer w-[24px] h-[24px] rounded-full hover:bg-slate-500 text-gray-600 hover:text-white">
          {showRepeatPassword ? (
            <FaEyeSlash onClick={() => setShowRepeatPassword(false)} />
          ) : (
            <FaEye onClick={() => setShowRepeatPassword(true)} />
          )}
        </div>
      </div>
      <Button className="w-full" type="submit">
        Register
      </Button>
      <p className="text-gray-400 text-sm"> -- or -- </p>
      <div className="flex flex-col w-full gap-2">
        <Button className="w-full" type="button">
          <span className="mr-1">Login using Google </span>
          <FcGoogle />
        </Button>
        <Button className="w-full" type="button">
          <span className="mr-1">Login using Spotify</span>{" "}
          <FaSpotify className="text-blue-700" />
        </Button>
      </div>
      <div>
        <p className="text-gray-400 text-sm">
          Already signed? Then{" "}
          <span
            className="underline font-bold text-white cursor-pointer"
            onClick={() => setPageMode("login")}
          >
            login here
          </span>
        </p>
      </div>
    </form>
  );
};

export default AuthForm;
