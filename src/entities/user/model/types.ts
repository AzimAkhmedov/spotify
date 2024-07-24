export interface IUser {
  id: number;
  email: string;
  password: string;
  profile_img_url?: string;
}
export interface IUserResponse {
  user: IUser;
  token: string;
  message: string;
}

export interface ICreateUser {
  email: string;
  password: string;
}

export interface IUserState {
  isAuth: boolean;
  user: IUser | null;
  authLoading?: boolean;
  authError?: string | null;
  authStep:
    | "login"
    | "register"
    | "forgot-password"
    | "register-from-oauth"
    | "redirecting";
  defaultUserCredentials?: {
    email?: string;
    name?: string;
    picture?: string | null;
  };
}

export interface IOauthResponse {
  user?: IUser;
  token?: string;
  message: string;
  email?: string;
  name?: string;
  picture?: string | null;
}
