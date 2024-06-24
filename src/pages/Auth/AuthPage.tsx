import React from "react";
import { Input } from "@components/input";
import { Button } from "@components/button";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookSquare } from "react-icons/fa";
import { NavLink } from "react-router-dom";
const AuthPage: React.FC = () => {
  return (
    <div className="min-h-[100vh] flex justify-center items-center">
      <form
        action=""
        className="h-full flex flex-col gap-4  items-center justify-center border rounded-xl p-5 min-w-[398px] mx-auto"
      >
        <Input placeholder="Email" type="email" required />
        <Input placeholder="Password" required />
        <Button className="w-full" type="submit">
          Login
        </Button>
        <p className="text-gray-400 text-sm"> -- or -- </p>
        <div className="flex flex-col w-full gap-2">
          <Button className="w-full">
            <span className="mr-1">Login using Google </span>
            <FcGoogle />
          </Button>
          <Button className="w-full">
            <span className="mr-1">Login using Facebook</span>{" "}
            <FaFacebookSquare className="text-blue-700" />
          </Button>
        </div>
        <div>
          <p className="text-gray-400 text-sm">
            Still not member? Then{" "}
            <NavLink to={""} className="underline font-bold text-white">
              register here
            </NavLink>
          </p>
        </div>
      </form>
    </div>
  );
};

export default AuthPage;
