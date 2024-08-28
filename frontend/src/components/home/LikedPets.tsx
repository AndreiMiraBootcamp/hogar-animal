// src/components/LikedPetsCarousel.tsx
import React, { useEffect, useState } from 'react';
import { fetchLikedPets } from '../../api/pets';
import { Pet } from '../../interfaces/Pet';
import { useAuth } from '../../context/AuthContext';

const LikedPets: React.FC = () => {
    const [likedPets, setLikedPets] = useState<Pet[]>([]);
    const { userData, token } = useAuth();

    useEffect(() => {
        const loadLikedPets = async () => {
            if (userData && token) {
                const pets = await fetchLikedPets(userData.userId, token);
                setLikedPets(pets);
            }
        };
        loadLikedPets();
    }, [userData, token]);

    if (!userData || likedPets.length === 0) return null;

    return (
        <div className="carousel-container p-4">
            <h2 className="text-xl font-bold mb-4">Animales que te han gustado</h2>
            <div className="carousel flex space-x-4 overflow-x-scroll">
                {likedPets.map(pet => (
                    <div key={pet.petId} className="w-64 h-64 flex-shrink-0 border rounded shadow-md">
                        <img src={pet.imageUrl} alt={pet.name} className="w-full h-48 object-cover rounded-t" />
                        <div className="p-2">
                            <h3 className="text-lg font-semibold">{pet.name}</h3>
                            <p>{pet.species}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LikedPets;
