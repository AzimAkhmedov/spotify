import { AuthForm, CreateFromOAuth } from "@/features/auth-user/";
import { useAppSelector } from "@/shared/hooks/reduxHooks";
import React from "react";

const AuthPage: React.FC = () => {
  const authState = useAppSelector((state) => state.user);
  return (
    <div className="min-h-[100vh] flex justify-center items-center">
      {authState.authStep === "login" || authState.authStep === "register" ? (
        <AuthForm />
      ) : authState.authStep === "register-from-oauth" ? (
        <CreateFromOAuth />
      ) : authState.authStep === "redirecting" ? (
        <div className="h-full flex items-center justify-center">
          <h2>Redirecting...</h2>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AuthPage;
