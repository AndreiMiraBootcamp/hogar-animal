export const getAllPets = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/pets');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching pets:', error);
      return [];
    }
  };
  