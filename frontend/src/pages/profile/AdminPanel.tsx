import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateCenter from "../../components/admin/CreateCenter";
import AddPet from "../../components/admin/AddPet";
import { fetchCenters, loadCenters } from "../../api/centers"; // Ajusta la ruta según la ubicación del archivo

const AdminPanel: React.FC = () => {
  const [centers, setCenters] = useState<Array<{ center_id: number; name: string; imageUrl: string }>>([]);
  const [selectedCenter, setSelectedCenter] = useState<number | null>(null);
  const [showCreateCenter, setShowCreateCenter] = useState(false);
  const [showAddPet, setShowAddPet] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const centersData = await loadCenters();
        setCenters(centersData);
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
    setShowCreateCenter(false);
    fetchCenters(); 
  };

  const handleCenterSelected = (center_id: number) => {
    setSelectedCenter(center_id);
    setShowAddPet(true);
  };

  return (
    <div className="w-full p-6 m-4 shadow-md rounded-md mx-auto">
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
