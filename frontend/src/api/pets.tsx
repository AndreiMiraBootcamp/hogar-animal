import { Pet } from '../interfaces/Pet';

// Función para obtener todos los animales
export const getAllPets = async (): Promise<Pet[]> => {
  try {
    const response = await fetch('http://localhost:8080/api/pets');
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const pets: Pet[] = await response.json();
    return pets;

  } catch (error) {
    console.error('Error fetching pets:', error);
    return [];
  }
};

// Función para obtener un animal específico por ID
export const getPetById = async (id: number): Promise<Pet | null> => {
  try {
    const response = await fetch(`http://localhost:8080/api/pets/${id}`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const pet: Pet = await response.json();
    return pet;

  } catch (error) {
    console.error('Error fetching pet by ID:', error);
    return null;
  }
};

export const getPetsByCenterId = async (centerId: number): Promise<Pet[]> => {
  try {
    const response = await fetch(`http://localhost:8080/api/pets/center/${centerId}`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const pets: Pet[] = await response.json();
    return pets;

  } catch (error) {
    console.error('Error fetching pets by center ID:', error);
    return [];
  }
};
