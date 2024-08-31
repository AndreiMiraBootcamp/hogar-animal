export const createFavorite = async (userId: number, petId: number): Promise<boolean> => {
    try {
        const response = await fetch(`http://localhost:8080/api/favorites?petId=${petId}&userId=${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        });

        if (!response.ok) {
        throw new Error('Network response was not ok');
        }

        return true;
    } catch (error) {
        console.error('Error creating favorite:', error);
        return false;
    }
};

export const deleteFavorite = async (userId: number, petId: number): Promise<boolean> => {
    try {
      const response = await fetch(`http://localhost:8080/api/favorites?petId=${petId}&userId=${userId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      return true;
    } catch (error) {
      console.error('Error deleting favorite:', error);
      return false;
    }
};
  

export const getFavoritesByUserId = async (userId: number): Promise<any[] | null> => {
    try {
      const response = await fetch(`http://localhost:8080/api/favorites/user/${userId}`);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const favorites: any[] = await response.json(); // Usa `any` si no tienes un tipo específico
      return favorites;
  
    } catch (error) {
      console.error('Error fetching favorites by user ID:', error);
      return null;
    }
  };
  