import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import React from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { Input } from "@components/input";
import { Button } from "@components/button";
import { Alert, AlertDescription, AlertTitle } from "@components/alert";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import { register } from "@/entities/user";
import { useToast } from "@/shared/components/ui/use-toast";

interface IFormInputs {
  email: string;
  password: string;
  repeatPassword: string;
}

const CreateFromOAuth = () => {
  const dispatch = useAppDispatch();
  const loginState = useAppSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false);
  const { control, handleSubmit } = useForm<IFormInputs>();
  const { toast } = useToast();

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    if (loginState.authLoading) return;

    if (data.password !== data.repeatPassword) {
      toast({ title: "Passwords should be same!" });
      return;
    }
    dispatch(
      register({
        password: data.password,
        email: loginState.defaultUserCredentials?.email || "",
      })
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-full flex flex-col gap-4  items-center justify-center border rounded-xl p-5 min-w-[398px] mx-auto"
    >
      <h3>Seems like you've never registered. Create profile</h3>
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
        defaultValue={loginState.defaultUserCredentials?.email || ""}
        control={control}
        disabled
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
              placeholder="Repeat password"
              type={showRepeatPassword ? "text" : "password"}
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
      <Button
        className="w-full"
        type="submit"
        disabled={loginState.authLoading}
      >
        Create your account
      </Button>
    </form>
  );
};

export default CreateFromOAuth;
