import type { IUser, IUserSession } from "../types/IUser";
import type { Rol } from "../types/Rol";
import { getUsers, saveUsers, saveSession, removeSession, seedAdmin } from "./localStorage";
import { navigate } from "./navigate";

// Las direcciones de cada página, en un solo lugar
export const ROUTES = {
  login: "/src/pages/auth/login/login.html",
  registro: "/src/pages/auth/registro/registro.html",
  adminHome: "/src/pages/admin/home/home.html",
  clientHome: "/src/pages/client/home/home.html",
};

// A qué página va cada rol
export const HOME_BY_ROLE: Record<Rol, string> = {
  admin: ROUTES.adminHome,
  client: ROUTES.clientHome,
};

// Lo que devuelven las funciones: o salió bien, o salió mal con un mensaje
export type AuthResult = { ok: true } | { ok: false; error: string };

// ===== REGISTRO =====
export const registerUser = (email: string, password: string): AuthResult => {
  const emailLimpio = email.trim().toLowerCase();

  if (!emailLimpio || !password) {
    return { ok: false, error: "Completá email y contraseña" };
  }

  if (password.length < 6) {
    return { ok: false, error: "La contraseña debe tener al menos 6 caracteres" };
  }

  const users = getUsers();

  if (users.some((u) => u.email === emailLimpio)) {
    return { ok: false, error: "Ya existe un usuario con ese email" };
  }

  const nuevo: IUser = { email: emailLimpio, password, role: "client" };
  saveUsers([...users, nuevo]);

  return { ok: true };
};

// ===== LOGIN =====
export const loginUser = (email: string, password: string): AuthResult => {
  seedAdmin();
  const emailLimpio = email.trim().toLowerCase();

  const user = getUsers().find(
    (u) => u.email === emailLimpio && u.password === password
  );

  if (!user) {
    return { ok: false, error: "Email o contraseña incorrectos" };
  }

  const session: IUserSession = { email: user.email, role: user.role, loggedIn: true };
  saveSession(session);
  navigate(HOME_BY_ROLE[user.role]);

  return { ok: true };
};

// ===== LOGOUT =====
export const logout = (): void => {
  removeSession();
  navigate(ROUTES.login);
};