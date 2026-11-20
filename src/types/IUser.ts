import type { Rol } from "./Rol";

export interface IUser {
  email: string;
  password: string;
  role: Rol;
}

export interface IUserSession extends Omit<IUser, "password"> {
  loggedIn: boolean;
}