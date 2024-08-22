import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ConfirmDialog from '../components/ConfirmDialog';
import { useNavigate } from "react-router-dom";

const ResetPassword: React.FC = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogAction, setDialogAction] = useState<() => void>(() => { });

  const { token, userData } = useAuth();
  const navigate = useNavigate();

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogConfirm = () => {
    dialogAction();
    setDialogOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setDialogTitle('Error');
      setDialogMessage('Las contraseñas no coinciden.');
      setDialogOpen(true);
      return;
    }

    try {
      if (!userData || !token) {
        throw new Error('Usuario no autenticado');
      }

      const response = await fetch('http://localhost:8080/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: userData.userId,
          oldPassword,
          newPassword,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al cambiar la contraseña.');
      }

      const data = await response.text();
      setDialogTitle('Éxito');
      setDialogMessage(data || 'Contraseña actualizada con éxito.');
      setDialogAction(() => () => navigate("/login"));
      setDialogOpen(true);
    } catch (err) {
      console.error('Error:', err);
      setDialogTitle('Error');
      setDialogMessage('Error al cambiar la contraseña.');
      setDialogOpen(true);
    }
  };

  return (
    <div className="w-1/2 flex-box p-8 shadow-md rounded-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Cambia tu Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="flex mb-2 text-sm">Contraseña Actual</label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="flex mb-2 text-sm">Nueva Contraseña</label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="flex mb-2 text-sm">Confirmar Nueva Contraseña</label>
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
          Cambiar Contraseña
        </button>
      </form>

      {/* Diálogo de confirmación */}
      <ConfirmDialog
        open={dialogOpen}
        title={dialogTitle}
        message={dialogMessage}
        isError={dialogTitle === 'Error'}
        onClose={handleDialogClose}
        onConfirm={handleDialogConfirm}
      />
    </div>
  );
};

export default ResetPassword;
