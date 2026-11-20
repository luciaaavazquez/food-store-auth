import { registerUser, ROUTES } from "../../../utils/auth";
import { navigate } from "../../../utils/navigate";

const form = document.querySelector<HTMLFormElement>("#form");
const mensaje = document.querySelector<HTMLParagraphElement>("#mensaje");

form?.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();

  const formData = new FormData(form);
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const resultado = registerUser(email, password);

  if (!resultado.ok) {
    if (mensaje) mensaje.textContent = "❌ " + resultado.error;
    return;
  }

  alert("✅ Cuenta creada. Ahora iniciá sesión.");
  navigate(ROUTES.login);
});