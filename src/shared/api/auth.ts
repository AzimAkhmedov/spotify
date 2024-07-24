import { IOauthResponse, IUserResponse } from "@/entities/user";
import { instance } from "./instance";

export interface ILoginRequest {
  email: string;
  password: string;
}

export const LoginRequest = (data: ILoginRequest) =>
  instance.post<IUserResponse>("/auth/login", data);

export const RegisterRequest = (data: ILoginRequest) =>
  instance.post("/auth/register", data);

export const getOAuthContext = (token: string) => {
  return instance.post<IOauthResponse>("/auth/google-login", { token });
};

export const getOAuthContextSpotify = (token: string) => {
  return instance.post<IOauthResponse>("/auth/spotify-login", { token });
};
