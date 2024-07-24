import { useState } from "react";
import { Input } from "@components/input";
import { Button } from "@components/button";
import { Alert, AlertDescription, AlertTitle } from "@components/alert";

import { FcGoogle } from "react-icons/fc";
import { FaSpotify, FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { RegisterRequest } from "@/shared/api/auth";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";

interface IFormInputs {
  email: string;
  password: string;
  repeatPassword: string;
}

// TODO: Implement the AuthForm component
const AuthForm = () => {
  const dispatch = useAppDispatch();
  const loginState = useAppSelector((state) => state.user);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false);

  const { control, handleSubmit } = useForm<IFormInputs>();

  const onRegisterSubmit: SubmitHandler<IFormInputs> = (data) => {
    if (data.password !== data.repeatPassword) {
      alert("Passwords should be same");
      return;
    }
    RegisterRequest(data).then((res) => console.log(res));
  };

  return (
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
    </form>
  );
};

export default AuthForm;
