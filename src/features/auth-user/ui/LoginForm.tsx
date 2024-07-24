import { useState } from "react";
import { Input } from "@components/input";
import { Button } from "@components/button";
import { Alert, AlertDescription, AlertTitle } from "@components/alert";

import { FcGoogle } from "react-icons/fc";
import { FaSpotify, FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { IUserResponse, login } from "@/entities/user";
import { useToast } from "@/shared/components/ui/use-toast";
import { useCookies } from "react-cookie";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

interface IFormInputs {
  email: string;
  password: string;
  repeatPassword: string;
}

const AuthForm = () => {
  const dispatch = useAppDispatch();
  const loginState = useAppSelector((state) => state.user);
  const { toast } = useToast();
  const [_, setCookie] = useCookies<string>(["auth"]);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { control, handleSubmit } = useForm<IFormInputs>();

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      console.log(credentialResponse);
      const res = await axios.get(
        "https://www.googleapis.com/oauth2/v2/userinfo?access_token=" +
          credentialResponse.access_token
      );
      console.log(res.data);
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
      setCookie("auth-spot", res.payload);
    });
  };

  return (
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
        <Button className="w-full" type="button">
          <span className="mr-1">Login using Spotify</span>{" "}
          <FaSpotify className="text-blue-700" />
        </Button>
      </div>
    </form>
  );
};

export default AuthForm;
