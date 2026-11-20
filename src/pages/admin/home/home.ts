import { logout } from "../../../utils/auth";
import { getSession } from "../../../utils/localStorage";

const saludo = document.querySelector<HTMLParagraphElement>("#saludo");
const botonLogout = document.querySelector<HTMLButtonElement>("#logoutButton");

const session = getSession();
if (saludo && session) {
  saludo.textContent = `Sesión iniciada como ${session.email} (${session.role})`;
}

botonLogout?.addEventListener("click", () => logout());