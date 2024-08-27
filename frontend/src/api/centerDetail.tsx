import { Center } from '../interfaces/Center';
import { Pet } from '../interfaces/Pet';

// Función para obtener los detalles del centro desde la API
export const fetchCenterDetail = async (id: string): Promise<Center> => {
    const response = await fetch(`http://localhost:8080/api/adoption-centers/${id}`);
    if (!response.ok) {
        throw new Error('Error al obtener los datos del centro');
    }
    return response.json();
};

// Función para obtener los animales de un centro específico desde la API
export const fetchPets = async (centerId: string): Promise<Pet[]> => {
    const response = await fetch(`http://localhost:8080/api/pets/center/${centerId}`);
    if (!response.ok) {
        throw new Error('Error al obtener los datos de los animales');
    }
    return response.json();
};