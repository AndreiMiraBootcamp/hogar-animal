import { Center } from '../interfaces/Center';

// Función para obtener los conteos de mascotas para un centro
const fetchPetCountsForCenter = async (centerId: number) => {
    try {
        const response = await fetch(`http://localhost:8080/api/pets/center/${centerId}/species-count`);
        if (!response.ok) {
            throw new Error('Error al cargar los conteos de mascotas para el centro con ID: ' + centerId);
        }

        // Verifica si la respuesta contiene contenido antes de intentar analizarla
        const textResponse = await response.text();

        if (!textResponse) {
            console.warn('La respuesta está vacía para el centro con ID: ' + centerId);
            return [];
        }

        const petCounts = JSON.parse(textResponse);
        return Object.keys(petCounts).map(species => ({
            type: species,
            quantity: petCounts[species],
        }));
    } catch (error) {
        console.error('Error al obtener los conteos de mascotas:', error);
        return [];
    }
};

// Función para obtener todos los centros
export const fetchCenters = async (): Promise<Center[]> => {
    try {
        const response = await fetch('http://localhost:8080/api/adoption-centers');
        if (!response.ok) {
            throw new Error('Error al cargar los datos de la API');
        }
        const data: Center[] = await response.json();

        const centersWithDetails = await Promise.all(
            data.map(async (center) => {
                const imageUrl = `http://localhost:5173/${center.photoUrl}/image_1.jpg`;
                const pets = await fetchPetCountsForCenter(center.centerId);
                return {
                    ...center,
                    imageUrl,
                    pets,
                };
            })
        );

        const cachedCenters = localStorage.getItem('centers');
        const parsedCachedCenters: Center[] = cachedCenters ? JSON.parse(cachedCenters) : [];

        // Comparar los datos
        const hasChanged = JSON.stringify(parsedCachedCenters) !== JSON.stringify(centersWithDetails);

        if (hasChanged) {
            // Solo actualizar el localStorage y disparar el evento si los datos han cambiado
            localStorage.setItem('centers', JSON.stringify(centersWithDetails));

            // Disparar evento personalizado
            const event = new Event('centers-updated');
            window.dispatchEvent(event);
        }

        return centersWithDetails;
    } catch (error) {
        console.error('Error al cargar los datos de la API', error);
        throw error;
    }
};

// Función para cargar centros de localStorage o API
export const loadCenters = async (): Promise<Center[]> => {
    const cachedCenters = localStorage.getItem('centers');
    const parsedCachedCenters: Center[] = cachedCenters ? JSON.parse(cachedCenters) : [];

    if (parsedCachedCenters.length === 0) {
        return await fetchCenters();
    } else {
        // Fetch en segundo plano para actualizar si es necesario
        fetchCenters().catch(error => console.error('Error fetching centers in the background:', error));
        return parsedCachedCenters;
    }
};

// Nueva función para actualizar la información del refugio
export const updateCenter = async (centerId: number, updatedData: Partial<Center>): Promise<void> => {
    try {
        const response = await fetch(`http://localhost:8080/api/adoption-centers/${centerId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            throw new Error('Error al actualizar el refugio con ID: ' + centerId);
        }

        // Opcional: Actualizar el caché local después de la actualización
        const centers = await fetchCenters();
        localStorage.setItem('centers', JSON.stringify(centers));

        // Disparar evento personalizado si es necesario
        const event = new Event('centers-updated');
        window.dispatchEvent(event);
    } catch (error) {
        console.error('Error al actualizar el refugio:', error);
        throw error;
    }
};
