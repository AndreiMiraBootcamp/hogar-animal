// src/pages/AdminPanel.tsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateCenter from "../../components/others/CreateCenter"; // Ajusta la ruta según la ubicación del componente
import AddPet from "../../components/others/AddPet"; // Ajusta la ruta según la ubicación del componente

const AdminPanel: React.FC = () => {
  const [centers, setCenters] = useState<Array<{ center_id: number; name: string }>>([]);
  const [selectedCenter, setSelectedCenter] = useState<number | null>(null);
  const [showCreateCenter, setShowCreateCenter] = useState(false);
  const [showAddPet, setShowAddPet] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/centers");
        if (response.ok) {
          const data = await response.json();
          setCenters(data);
        } else {
          throw new Error("Error fetching centers");
        }
      } catch (error) {
        console.error("Error fetching centers:", error);
      }
    };

    fetchCenters();
  }, []);

  const handleCreateCenter = () => {
    setShowCreateCenter(true);
  };

  const handleAddPet = () => {
    if (centers.length === 0) {
      setShowCreateCenter(true);
    } else {
      setShowAddPet(true);
    }
  };

  const handleCenterCreated = () => {
    // Reload centers after creating a new one
    setShowCreateCenter(false);
    fetchCenters();
  };

  const handleCenterSelected = (center_id: number) => {
    setSelectedCenter(center_id);
    setShowAddPet(true);
  };

  const fetchCenters = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/centers");
      if (response.ok) {
        const data = await response.json();
        setCenters(data);
      } else {
        throw new Error("Error fetching centers");
      }
    } catch (error) {
      console.error("Error fetching centers:", error);
    }
  };

  return (
    <div className="w-full p-6 m-4 shadow-md rounded-md mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Panel de Administración</h1>

      <div className="mb-6">
        <button
          onClick={handleAddPet}
          className="w-full p-2 bg-gray-700 text-white rounded hover:bg-gray-800"
        >
          Añadir Animal
        </button>
      </div>

      {centers.length === 0 && (
        <div className="mb-6">
          <p className="text-center">No tienes refugios registrados.</p>
          <button
            onClick={handleCreateCenter}
            className="w-full p-2 bg-gray-700 text-white rounded hover:bg-gray-800"
          >
            Crear un Refugio
          </button>
        </div>
      )}

      {centers.length > 0 && (
        <div className="mb-6">
          <p className="text-center">Selecciona un refugio para añadir un animal:</p>
          <ul>
            {centers.map(center => (
              <li key={center.center_id} className="mb-2">
                <button
                  onClick={() => handleCenterSelected(center.center_id)}
                  className="w-full p-2 bg-gray-700 text-white rounded hover:bg-gray-800"
                >
                  {center.name}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <button
              onClick={handleCreateCenter}
              className="w-full p-2 bg-gray-700 text-white rounded hover:bg-gray-800"
            >
              Crear un Nuevo Refugio
            </button>
          </div>
        </div>
      )}

      {showCreateCenter && (
        <CreateCenter onCenterCreated={handleCenterCreated} />
      )}

      {showAddPet && !showCreateCenter && (
        <AddPet selectedCenter={selectedCenter} />
      )}
    </div>
  );
};

export default AdminPanel;
