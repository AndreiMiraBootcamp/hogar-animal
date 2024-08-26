export interface Center {
    centerId: number;
    name: string;
    city: {
        cityId: number;
        name: string;
        state: {
            stateId: number;
            name: string;
        };
    };
    userId: number;
    address: string;
    postalCode: string;
    phone: string;
    website: string;
    foundationYear: number;
    photoUrl: string;
    imageUrl?: string; // Campo opcional
    position?: [number, number]; // Campo opcional
}
