import { useState } from "react";
import { API_URL } from "../../config";

function useLoginUser() {
  const [error, setError] = useState(null);

  const loginUser = async (email, password) => {
    setError(null);

    try {
      // 1. Llamamos a nuestro backend real de Node.js
      const response = await fetch(`${API_URL}api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      // Si las credenciales están mal (error 400 o 401)
      if (!response.ok) {
        setError(data.error || "Email o contraseña incorrectos");
        return null;
      }

      // 2. Guardamos el token en el navegador para futuras peticiones protegidas
      sessionStorage.setItem("token", data.token);

      // 3. El Adaptador: armamos el objeto de usuario que espera React
      const userLogged = {
        id: data.usuario._id,
        name: `${data.usuario.nombre} ${data.usuario.apellido}`,
        email: data.usuario.email,
        role: data.usuario.rol, // Para que isAdmin sea true
        token: data.token,
      };

      return userLogged;
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError("No se pudo conectar con el servidor");
      return null;
    }
  };

  return {
    error,
    loginUser,
  };
}

export default useLoginUser;