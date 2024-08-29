import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import AnimalCard from "../cards/AnimalCard";
import { Pet } from "../../interfaces/Pet";
import { getAllPets } from "../../api/pets";
import { getFavoritesByUserId } from "../../api/favourites";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Destacados.css";

const CustomArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <button
      className={className}
      style={{ ...style, display: "block", background: "#374151", borderRadius: "50%" }}
      onClick={onClick}
    >
      {props.type === "prev" ? "<" : ">"}
    </button>
  );
};

interface DestacadosProps {
  showFavorites?: boolean; // Prop opcional para mostrar favoritos
  userId?: number | null; // Prop opcional para el userId
}

const Destacados: React.FC<DestacadosProps> = ({ showFavorites = false, userId }) => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [favoritePetIds, setFavoritePetIds] = useState<number[]>([]); // Estado para almacenar IDs de favoritos

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const petsData = await getAllPets();
        let filteredPets: Pet[] = petsData;

        if (userId) {
          
          // Si el usuario ha iniciado sesión, obtener favoritos
          const favorites = await getFavoritesByUserId(userId);
          const favoriteIds = favorites.map(fav => fav.petId);
          setFavoritePetIds(favoriteIds);

          if (showFavorites) {
            // Mostrar solo favoritos si se solicita
            filteredPets = petsData.filter(pet => favoriteIds.includes(pet.petId));
          } else {
            // Mostrar destacados excluyendo los favoritos
            const daysToFilter = 90;
            const now = new Date().getTime();
            const daysInMillis = daysToFilter * 24 * 60 * 60 * 1000;

            filteredPets = petsData
              .filter(pet => {
                const isAvailable = pet.available;
                const createdAtDate = new Date(pet.createdAt);

                if (isNaN(createdAtDate.getTime())) {
                  console.error(`Invalid date: ${pet.createdAt}`);
                  return false;
                }

                const isRecent = now - createdAtDate.getTime() <= daysInMillis;
                return isAvailable && isRecent && !favoriteIds.includes(pet.petId); // Excluir favoritos
              })
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          }
        } else {
          // Si no hay sesión iniciada, mostrar solo destacados recientes
          const daysToFilter = 90;
          const now = new Date().getTime();
          const daysInMillis = daysToFilter * 24 * 60 * 60 * 1000;

          filteredPets = petsData
            .filter(pet => {
              const isAvailable = pet.available;
              const createdAtDate = new Date(pet.createdAt);

              if (isNaN(createdAtDate.getTime())) {
                console.error(`Invalid date: ${pet.createdAt}`);
                return false;
              }

              const isRecent = now - createdAtDate.getTime() <= daysInMillis;
              return isAvailable && isRecent;
            })
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }

        setPets(filteredPets);
      } catch (err) {
        console.error("Error fetching pets:", err);
        setPets([]); // Asegurarse de que no se muestren animales en caso de error
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, [showFavorites, userId]);

  if (loading) {
    return null; // No renderizar nada mientras carga
  }

  if (pets.length === 0) {
    return null; // No renderizar nada si no hay animales a mostrar
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <CustomArrow type="next" />,
    prevArrow: <CustomArrow type="prev" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full mt-6">
      <h1 className="text-4xl font-semibold">
        {showFavorites && userId ? "Tus Favoritos" : "Destacados"}
      </h1>
      {pets.length >= 4 ? (
        <Slider {...settings}>
          {pets.map((pet) => (
            <div key={pet.petId} className="py-6 px-3">
              <AnimalCard pet={pet} userId={userId} />
            </div>
          ))}
        </Slider>
      ) : (
        <div className="flex justify-center flex-wrap">
          {pets.map((pet) => (
            <div key={pet.petId} className="py-6 px-3 card-width">
              <AnimalCard pet={pet} userId={userId} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Destacados;
