import { useAppSelector } from "@/shared/hooks/reduxHooks";
import React from "react";

const HomePage = () => {
  const authState = useAppSelector((state) => state.user);
  return <div className="border">{authState.user?.email}</div>;
};

export default HomePage;
