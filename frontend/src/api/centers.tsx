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

export const fetchCenters = async (): Promise<Center[]> => {
    try {
        // Verificar si los datos ya están en el localStorage
        const cachedCenters = localStorage.getItem('centers');
        if (cachedCenters) {
            // Retorna los datos almacenados en el localStorage para mostrar inmediatamente en la aplicación
            return JSON.parse(cachedCenters);
        }

        // Hacer fetch de los centros desde la API para asegurar que obtenemos datos actualizados
        const fetchAndProcessCenters = async () => {
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

            return centersWithDetails;
        };

        // Cargar datos desde la API en segundo plano
        fetchAndProcessCenters().then((centersWithDetails) => {
            // Verificar si los nuevos datos son diferentes a los que están en localStorage
            const currentCenters = cachedCenters ? JSON.parse(cachedCenters) : [];
            if (JSON.stringify(currentCenters) !== JSON.stringify(centersWithDetails)) {
                // Si los datos han cambiado, actualiza el localStorage y el estado de la aplicación
                localStorage.setItem('centers', JSON.stringify(centersWithDetails));
                window.dispatchEvent(new Event('centers-updated')); // Opcional: Disparar un evento para actualizar el estado en la aplicación si es necesario
            }
        });

        // Retornar los datos almacenados localmente inicialmente para una carga rápida
        return cachedCenters ? JSON.parse(cachedCenters) : [];
    } catch (error) {
        console.error('Error al cargar los datos de la API', error);
        throw error;
    }
};