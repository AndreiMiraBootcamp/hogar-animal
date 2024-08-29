import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateCenter from "../../components/admin/CreateCenter";
import AddPet from "../../components/admin/AddPet";
import EditCenter from "../../components/admin/EditCenter";
import { loadCenters } from "../../api/centers"; // Ajusta la ruta según la ubicación del archivo

const AdminPanel: React.FC = () => {
  const [centers, setCenters] = useState<Array<{ centerId: number; name: string; imageUrl: string }>>([]);
  const [filteredCenters, setFilteredCenters] = useState<Array<{ centerId: number; name: string; imageUrl: string }>>([]);
  const [selectedCenter, setSelectedCenter] = useState<number | null>(null);
  const [showCreateCenter, setShowCreateCenter] = useState(false); // Estado para controlar la visibilidad del diálogo de creación de centro
  const [showAddPetDialog, setShowAddPetDialog] = useState(false);
  const [showEditCenter, setShowEditCenter] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Mover la función fetchCenters fuera del useEffect
  const fetchCenters = async () => {
    try {
      const centersData = await loadCenters();
      setCenters(centersData);
      setFilteredCenters(centersData); // Inicialmente, muestra todos los centros
    } catch (error) {
      console.error("Error fetching centers:", error);
    }
  };

  useEffect(() => {
    fetchCenters(); // Llamada inicial para cargar los centros
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

  const handleAddPet = (centerId: number) => {
    setSelectedCenter(centerId);
    setShowAddPetDialog(true);
  };

  const handleCenterCreated = () => {
    setShowCreateCenter(false);
    fetchCenters(); // Recarga los centros después de crear uno nuevo
  };

  const handleEditCenter = (centerId: number) => {
    setShowEditCenter(centerId);
  };

  const handleCenterUpdated = () => {
    setShowEditCenter(null);
    fetchCenters(); // Recarga los centros después de actualizar uno
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
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="col-span-1 flex items-center justify-center">
        <button
          onClick={handleCreateCenter}
          className="w-30 p-2 mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded"
        >
          Crear un Nuevo Refugio
        </button>
      </div>

      {filteredCenters.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
          {filteredCenters.map(center => (
            <div key={center.centerId} className="border rounded-md overflow-hidden shadow-lg">
              <img
                src={center.imageUrl}
                alt={center.name}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold mb-2">{center.name}</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditCenter(center.centerId)}
                    className="flex-1 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleAddPet(center.centerId)}
                    className="flex-1 p-2 bg-gradient-to-r from-blue-50 to-blue-100 rounded"
                  >
                    Añadir Animal
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
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

      {showCreateCenter && (
        <CreateCenter
          open={showCreateCenter}
          onClose={() => setShowCreateCenter(false)}
          onCenterCreated={handleCenterCreated}
        />
      )}

      <AddPet
        selectedCenter={selectedCenter}
        open={showAddPetDialog}
        onClose={() => setShowAddPetDialog(false)}
      />

      {showEditCenter !== null && (
        <EditCenter
          open={showEditCenter !== null}
          centerId={showEditCenter}
          onClose={() => setShowEditCenter(null)}
          onCenterUpdated={handleCenterUpdated}
        />
      )}
    </div>
  );
};

export default AdminPanel;
