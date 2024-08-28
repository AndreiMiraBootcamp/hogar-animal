import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateCenter from "../../components/admin/CreateCenter";
import AddPet from "../../components/admin/AddPet";
import EditCenter from "../../components/admin/EditCenter";
import { loadCenters, updateCenter } from "../../api/centers"; // Ajusta la ruta según la ubicación del archivo

const AdminPanel: React.FC = () => {
  const [centers, setCenters] = useState<Array<{ center_id: number; name: string; imageUrl: string }>>([]);
  const [filteredCenters, setFilteredCenters] = useState<Array<{ center_id: number; name: string; imageUrl: string }>>([]);
  const [selectedCenter, setSelectedCenter] = useState<number | null>(null);
  const [showCreateCenter, setShowCreateCenter] = useState(false);
  const [showAddPet, setShowAddPet] = useState(false);
  const [showEditCenter, setShowEditCenter] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const centersData = await loadCenters();
        setCenters(centersData);
        setFilteredCenters(centersData); // Inicialmente, muestra todos los centros
      } catch (error) {
        console.error("Error fetching centers:", error);
      }
    };

    fetchCenters();
  }, []);

  useEffect(() => {
    // Filtra los centros cuando cambia el término de búsqueda
    if (searchTerm === "") {
      setFilteredCenters(centers);
    } else {
      setFilteredCenters(
        centers.filter(center =>
          center.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, centers]);

  const handleCreateCenter = () => {
    setShowCreateCenter(true);
  };

  const handleAddPet = (center_id: number) => {
    setSelectedCenter(center_id);
    setShowAddPet(true);
  };

  const handleCenterCreated = () => {
    setShowCreateCenter(false);
    fetchCenters(); 
  };

  const handleEditCenter = (center_id: number) => {
    setShowEditCenter(center_id);
  };

  const handleCenterUpdated = () => {
    setShowEditCenter(null);
    fetchCenters(); 
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="w-full p-6 m-4 shadow-md rounded-md mx-auto">
      {/* Campo de búsqueda */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar refugios..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
      </div>

      {filteredCenters.length === 0 && (
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

      {filteredCenters.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
          {filteredCenters.map(center => (
            <div key={center.center_id} className="border rounded-md overflow-hidden shadow-lg">
              <img
                src={center.imageUrl}
                alt={center.name}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold mb-2">{center.name}</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditCenter(center.center_id)}
                    className="flex-1 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleAddPet(center.center_id)}
                    className="flex-1 p-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Añadir Animal
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="col-span-1 flex items-center justify-center">
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

      {showEditCenter !== null && (
        <EditCenter
          centerId={showEditCenter}
          onClose={() => setShowEditCenter(null)}
          onCenterUpdated={handleCenterUpdated}
        />
      )}
    </div>
  );
};

export default AdminPanel;
