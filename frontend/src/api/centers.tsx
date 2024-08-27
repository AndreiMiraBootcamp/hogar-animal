import { Center } from '../interfaces/Center';

// Función para obtener coordenadas a partir de una dirección
const getCoordinatesFromAddress = async (address: string, postalCode: string): Promise<[number, number] | undefined> => {
    const fullAddress = `${address}, ${postalCode}`;
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}`;

    try {
        const response = await fetch(geocodeUrl);
        const data = await response.json();

        if (data && data.length > 0) {
            return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
        }
    } catch (error) {
        console.error('Error al obtener coordenadas:', error);
    }

    return undefined;
};

const fetchPetCountsForCenter = async (centerId: number) => {
    try {
        const response = await fetch(`http://localhost:8080/api/pets/center/${centerId}/species-count`);
        if (!response.ok) {
            throw new Error('Error al cargar los conteos de mascotas para el centro con ID: ' + centerId);
        }
        const petCounts = await response.json();
        return Object.keys(petCounts).map(species => ({
            type: species,
            quantity: petCounts[species],
        }));
    } catch (error) {
        console.error('Error al obtener los conteos de mascotas:', error);
        return [];
    }
};

// Función para cargar los centros desde la API
export const fetchCenters = async (): Promise<Center[]> => {
    try {
        const response = await fetch('http://localhost:8080/api/adoption-centers');
        if (!response.ok) {
            throw new Error('Error al cargar los datos de la API');
        }
        const data: Center[] = await response.json();

        // Para cada centro, obtener las mascotas desde la API específica
        const centersWithDetails = await Promise.all(
            data.map(async (center) => {
                const coordinates = await getCoordinatesFromAddress(center.address, center.postalCode);
                const imageUrl = `http://localhost:5173/${center.photoUrl}/image_1.jpg`;

                // Obtener las mascotas desde la API
                const pets = await fetchPetCountsForCenter(center.centerId);

                return {
                    ...center,
                    position: coordinates,
                    imageUrl,
                    pets, // Agregar las mascotas obtenidas desde la API
                };
            })
        );

        return centersWithDetails;
    } catch (error) {
        console.error('Error al cargar los datos de la API', error);
        throw error;
    }
};

export const loadCenters = async (): Promise<Center[]> => {
    // Intentar cargar los datos desde el localStorage primero
    const cachedCenters = localStorage.getItem('centers');
    const parsedCachedCenters: Center[] = cachedCenters ? JSON.parse(cachedCenters) : [];

    // Hacer fetch en segundo plano para verificar si hay nuevos datos
    fetchCenters().then((centersFromAPI) => {
        // Comparar los datos de la API con los del localStorage
        if (JSON.stringify(parsedCachedCenters) !== JSON.stringify(centersFromAPI)) {
            // Si son diferentes, actualizar el localStorage y disparar un evento
            localStorage.setItem('centers', JSON.stringify(centersFromAPI));
            window.dispatchEvent(new Event('centers-updated')); // Disparar un evento para actualizar el estado en la aplicación si es necesario
        }
    }).catch(error => {
        console.error('Error fetching centers in the background:', error);
    });

    // Retornar los datos del localStorage para mostrar inicialmente
    return parsedCachedCenters;
};
