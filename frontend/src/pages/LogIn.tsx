import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../context/AuthContext"; // Importa el contexto

const LogIn: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth(); // Usa la función login del contexto
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
      });

      if (!response.ok) {
        throw new Error("Failed to log in");
      }

      const token = await response.text();
      const decodedToken: any = jwtDecode(token);

      if (decodedToken.userId) {
        const userId = decodedToken.userId;

        const userResponse = await fetch(`http://localhost:8080/protected/api/users/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Aquí se utiliza el token para la solicitud protegida
            "Content-Type": "application/json",
          },
        });

        if (!userResponse.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await userResponse.json();

        // Usa la función login del contexto para almacenar los datos del usuario y el token
        login(userData, token); // Aquí pasamos el token junto con los datos del usuario

        // La navegación se maneja aquí
        navigate("/"); // Redirige a la página principal

      } else {
        throw new Error("userId is not present in the token");
      }

    } catch (error) {
      console.error("Error during login:", error);
      setError("Hubo un problema con el inicio de sesión. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="w-1/2 p-6 m-4 shadow-md rounded-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="flex mb-2 text-sm">Nombre de Usuario</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="flex mb-2 text-sm">Contraseña</label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-gray-700 text-white rounded hover:bg-gray-800"
        >
          Iniciar Sesión
        </button>
      </form>
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      <div className="mt-4 text-center">
        <Link to="/resetpassword" className="text-sm text-blue-600 hover:underline">
          ¿Has perdido tu contraseña?
        </Link>
      </div>
      <div className="mt-2 text-center">
        <span className="text-sm text-gray-600">¿No tienes cuenta? </span>
        <Link to="/register" className="text-sm text-blue-600 hover:underline">
          Regístrate
        </Link>
      </div>
    </div>
  );
};

export default LogIn;