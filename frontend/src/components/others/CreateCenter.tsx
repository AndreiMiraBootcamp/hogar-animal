// src/pages/CreateCenter.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../others/ConfirmDialog"; 

interface CreateCenterProps {
  onCenterCreated: () => void;
}

const CreateCenter: React.FC<CreateCenterProps> = ({ onCenterCreated }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city_id: "",
    postal_code: "",
    phone: "",
    website: "",
    foundation_year: "",
    photoURL: ""
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogAction, setDialogAction] = useState<() => void>(() => {});

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append("name", formData.name);
    data.append("address", formData.address);
    data.append("city_id", formData.city_id);
    data.append("postal_code", formData.postal_code);
    data.append("phone", formData.phone);
    data.append("website", formData.website);
    data.append("foundation_year", formData.foundation_year);
    data.append("photoURL", formData.photoURL);

    try {
      const response = await fetch("http://localhost:8080/api/centers/create", {
        method: "POST",
        body: data
      });

      if (response.ok) {
        setDialogTitle("Éxito");
        setDialogMessage("Refugio creado exitosamente.");
        setDialogAction(() => () => {
          onCenterCreated();
          setDialogOpen(false);
        });
        setDialogOpen(true);
      } else {
        const errorText = await response.text();
        setDialogTitle("Error");
        setDialogMessage("Error al crear el refugio: " + errorText);
        setDialogAction(() => () => window.location.reload());
        setDialogOpen(true);
      }
    } catch (error) {
      console.error("Error al crear el refugio:", error);
      setDialogTitle("Error");
      setDialogMessage("Ocurrió un error al crear el refugio.");
      setDialogAction(() => () => window.location.reload());
      setDialogOpen(true);
    }
  };

  return (
    <div className="w-1/2 p-6 m-4 shadow-md rounded-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Crear Refugio</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 text-sm">Nombre del Refugio</label>
          <input
            type="text"
            name="name"
            className="w-full p-2 border rounded"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm">Dirección</label>
          <input
            type="text"
            name="address"
            className="w-full p-2 border rounded"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm">Ciudad ID</label>
          <input
            type="number"
            name="city_id"
            className="w-full p-2 border rounded"
            value={formData.city_id}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm">Código Postal</label>
          <input
            type="text"
            name="postal_code"
            className="w-full p-2 border rounded"
            value={formData.postal_code}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm">Teléfono</label>
          <input
            type="text"
            name="phone"
            className="w-full p-2 border rounded"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm">Sitio Web</label>
          <input
            type="text"
            name="website"
            className="w-full p-2 border rounded"
            value={formData.website}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm">Año de Fundación</label>
          <input
            type="number"
            name="foundation_year"
            className="w-full p-2 border rounded"
            value={formData.foundation_year}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm">URL de Foto</label>
          <input
            type="text"
            name="photoURL"
            className="w-full p-2 border rounded"
            value={formData.photoURL}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-gray-700 text-white rounded hover:bg-gray-800"
        >
          Crear Refugio
        </button>
      </form>

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

export default CreateCenter;
