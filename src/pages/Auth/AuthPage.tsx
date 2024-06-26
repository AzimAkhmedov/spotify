import { AuthForm } from "@/features/auth-user/";
import React from "react";

const AuthPage: React.FC = () => {
  return (
    <div className="min-h-[100vh] flex justify-center items-center">
      <AuthForm />
    </div>
  );
};

export default AuthPage;
