import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../components/ConfirmDialog"; // Ajusta la ruta según la ubicación de tu componente

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogAction, setDialogAction] = useState<() => void>(() => {});

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setDialogTitle("Error");
      setDialogMessage("Las contraseñas no coinciden");
      setDialogOpen(true);
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("email", email);

    try {
      const tokenResponse = await fetch("http://localhost:8080/api/auth/token", {
        method: "GET",
      });

      if (!tokenResponse.ok) {
        throw new Error("Failed to obtain token");
      }

      const token = await tokenResponse.text();

      const response = await fetch("http://localhost:8080/protected/api/users", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setDialogTitle("Registro Exitoso");
        setDialogMessage("Usuario registrado exitosamente.");
        setDialogAction(() => () => navigate("/login")); // Redirige al login
        setDialogOpen(true);
      } else {
        const errorText = await response.text();
        setDialogTitle("Error");
        setDialogMessage("Error en el registro: " + errorText);
        setDialogAction(() => () => window.location.reload());
        setDialogOpen(true);
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      setDialogTitle("Error");
      setDialogMessage("Ocurrió un error al registrar el usuario.");
      setDialogAction(() => () => window.location.reload());
      setDialogOpen(true);
    }
  };

  return (
    <div className="w-1/2 p-6 m-4 shadow-md rounded-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Registro</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-4">
          <label className="block mb-2 text-sm">Nombre de Usuario</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm">Correo Electrónico</label>
          <input
            type="email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm">Contraseña</label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm">Confirmar Contraseña</label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-gray-700 text-white rounded hover:bg-gray-800"
        >
          Registrarse
        </button>
      </form>

      {/* Dialogo de confirmación */}
      <ConfirmDialog
        open={dialogOpen}
        title={dialogTitle}
        message={dialogMessage}
        onClose={() => setDialogOpen(false)}
        onConfirm={() => {
          dialogAction();
          setDialogOpen(false);
        }}
      />
    </div>
  );
};

export default Register;
