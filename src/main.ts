import type { Rol } from "./types/Rol";
import { getSession, seedAdmin } from "./utils/localStorage";
import { navigate } from "./utils/navigate";
import { ROUTES, HOME_BY_ROLE } from "./utils/auth";

// Qué rol necesita cada zona
const ZONAS_PROTEGIDAS: { carpeta: string; rol: Rol }[] = [
  { carpeta: "/pages/admin/", rol: "admin" },
  { carpeta: "/pages/client/", rol: "client" },
];

export const guard = (): void => {
  seedAdmin();

  const url = window.location.pathname;
  const session = getSession();
  const zona = ZONAS_PROTEGIDAS.find((z) => url.includes(z.carpeta));

  // Regla 1: página protegida y SIN pulsera → al login
  if (zona && !session?.loggedIn) {
    navigate(ROUTES.login);
    return;
  }

  // Regla 2: página protegida con pulsera EQUIVOCADA → a su zona
  if (zona && session && session.role !== zona.rol) {
    navigate(HOME_BY_ROLE[session.role]);
    return;
  }

  // Regla 3: ya tiene pulsera y quiere ir al login/registro → a su zona
  if (url.includes("/pages/auth/") && session?.loggedIn) {
    navigate(HOME_BY_ROLE[session.role]);
    return;
  }

  // Pasó todos los controles: mostramos la página
  document.body.style.visibility = "visible";
};

guard();