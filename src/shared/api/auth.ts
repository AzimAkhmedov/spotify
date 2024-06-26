import { instance } from "./instance";

export interface ILoginRequest {
  email: string;
  password: string;
}

export const LoginRequest = (data: ILoginRequest) =>
  instance.post("/auth/login", data);

export const RegisterRequest = (data: ILoginRequest) =>
  instance.post("/auth/register", data);
