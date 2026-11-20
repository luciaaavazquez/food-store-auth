import type { IUser, IUserSession } from "../types/IUser";

// ===== LISTA DE USUARIOS REGISTRADOS (clave "users") =====

export const getUsers = (): IUser[] => {
  const data = localStorage.getItem("users");
  return data ? (JSON.parse(data) as IUser[]) : [];
};

export const saveUsers = (users: IUser[]): void => {
  localStorage.setItem("users", JSON.stringify(users));
};

// Crea un admin la primera vez (el registro solo crea clientes)
export const seedAdmin = (): void => {
  const users = getUsers();
  if (!users.some((u) => u.role === "admin")) {
    users.push({ email: "admin@foodstore.com", password: "admin123", role: "admin" });
    saveUsers(users);
  }
};

// ===== SESIÓN ACTIVA (clave "userData") =====

export const saveSession = (session: IUserSession): void => {
  localStorage.setItem("userData", JSON.stringify(session));
};

export const getSession = (): IUserSession | null => {
  const data = localStorage.getItem("userData");
  return data ? (JSON.parse(data) as IUserSession) : null;
};

export const removeSession = (): void => {
  localStorage.removeItem("userData");
};