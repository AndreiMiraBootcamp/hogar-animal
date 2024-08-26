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

// Función para cargar los centros desde la API
export const fetchCenters = async (): Promise<Center[]> => {
    try {
        // Verificar si los datos ya están en el localStorage
        const cachedCenters = localStorage.getItem('centers');
        if (cachedCenters) {
            return JSON.parse(cachedCenters);
        }

        const response = await fetch('http://localhost:8080/api/adoption-centers');
        if (!response.ok) {
            throw new Error('Error al cargar los datos de la API');
        }
        const data: Center[] = await response.json();

        // Agregar coordenadas y la URL completa de la imagen principal
        const centersWithDetails = await Promise.all(
            data.map(async (center) => {
                const coordinates = await getCoordinatesFromAddress(center.address, center.postalCode);
                const imageUrl = `http://localhost:5173/${center.photoUrl}/image_1.jpg`; // Generar la URL completa de la imagen principal
                return {
                    ...center,
                    position: coordinates, // Agregar coordenadas al centro
                    imageUrl, // Agregar la URL completa de la imagen principal
                };
            })
        );

        // Guardar los datos en el localStorage
        localStorage.setItem('centers', JSON.stringify(centersWithDetails));

        return centersWithDetails;
    } catch (error) {
        console.error('Error al cargar los datos de la API', error);
        throw error;
    }
};