import { IUser } from "./user.interface";

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ILoginResponse {
  code: number;
  status: boolean;
  message: string;
  user: IUser;
  errors: any;
}

