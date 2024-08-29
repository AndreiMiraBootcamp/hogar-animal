import React, { useState, useEffect } from 'react';
import { updateCenter } from '../../api/centers'; // Ajusta la ruta según la ubicación del archivo
import { Center } from '../../interfaces/Center'; // Ajusta la ruta según la ubicación del archivo

interface EditCenterProps {
  centerId: number;
  onClose: () => void;
  onCenterUpdated: () => void;
}

const EditCenter: React.FC<EditCenterProps> = ({ centerId, onClose, onCenterUpdated }) => {
  const [centerDetails, setCenterDetails] = useState<Partial<Center>>({});

  useEffect(() => {
    const fetchCenterDetails = async () => {
      try {
        const center = await fetch(`/api/centers/${centerId}`).then(res => res.json());
        setCenterDetails(center);
      } catch (error) {
        console.error('Error fetching center details:', error);
      }
    };

    fetchCenterDetails();
  }, [centerId]);

  const handleInputChange = (field: keyof Center, value: any) => {
    setCenterDetails(prevDetails => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await updateCenter(centerId, centerDetails);
      onCenterUpdated();
      onClose();
    } catch (error) {
      console.error('Error updating center:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-lg">
        <h2 className="text-lg font-bold mb-4">Editar Refugio</h2>

        <label className="block mb-2">
          Nombre:
          <input
            type="text"
            value={centerDetails.name || ''}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </label>

        <label className="block mb-2">
          Dirección:
          <input
            type="text"
            value={centerDetails.address || ''}
            onChange={(e) => handleInputChange('address', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </label>

        <label className="block mb-2">
          Código Postal:
          <input
            type="text"
            value={centerDetails.postalCode || ''}
            onChange={(e) => handleInputChange('postalCode', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </label>

        <label className="block mb-2">
          Ciudad:
          <input
            type="text"
            value={centerDetails.city?.name || ''}
            onChange={(e) => handleInputChange('city', { ...centerDetails.city, name: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </label>

        <label className="block mb-2">
          Estado:
          <input
            type="text"
            value={centerDetails.city?.state.name || ''}
            onChange={(e) => handleInputChange('city', {
              ...centerDetails.city,
              state: { ...centerDetails.city?.state, name: e.target.value }
            })}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </label>

        <label className="block mb-2">
          Teléfono:
          <input
            type="text"
            value={centerDetails.phone || ''}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </label>

        <label className="block mb-2">
          Página Web:
          <input
            type="text"
            value={centerDetails.website || ''}
            onChange={(e) => handleInputChange('website', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </label>

        <label className="block mb-2">
          Año de Fundación:
          <input
            type="number"
            value={centerDetails.foundationYear || ''}
            onChange={(e) => handleInputChange('foundationYear', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </label>

        <label className="block mb-2">
          URL de la Foto:
          <input
            type="text"
            value={centerDetails.photoUrl || ''}
            onChange={(e) => handleInputChange('photoUrl', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </label>

        <label className="block mb-4">
          URL de la Imagen:
          <input
            type="text"
            value={centerDetails.imageUrl || ''}
            onChange={(e) => handleInputChange('imageUrl', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </label>

        <div className="flex space-x-2">
          <button
            onClick={handleSave}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Guardar
          </button>
          <button
            onClick={onClose}
            className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCenter;
