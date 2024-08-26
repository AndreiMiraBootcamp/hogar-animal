import { Center } from '../interfaces/Center'; // Asegúrate de tener la interfaz Center definida en tu proyecto

// Función para obtener un centro de adopción específico por ID
export const getCenterById = async (id: number): Promise<Center | null> => {
  try {
    const response = await fetch(`http://localhost:8080/api/adoption-centers/${id}`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const center: Center = await response.json();
    return center;

  } catch (error) {
    console.error('Error fetching center by ID:', error);
    return null;
  }
};
