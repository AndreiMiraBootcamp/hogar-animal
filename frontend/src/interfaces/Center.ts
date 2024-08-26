export interface Center {
    centerId: number;
    name: string;
    city: {
        cityId: number;
        name: string;
    };
    address: string;
    postalCode: string;
    phone: string;
    website: string;
    foundationYear: number;
    photoUrl: string;
    imageUrl?: string; 
    position?: [number, number]; 
}