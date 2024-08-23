import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import AnimalCard from "../cards/AnimalCard";
import { Pet } from "../../interfaces/pet";
import { getAllPets } from "../../api/pets";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

const Destacados: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const petsData = await getAllPets();
        
        // Filtrar los datos para obtener solo los animales disponibles y que han sido publicados hace un tiempo
        const filterPets = petsData.filter((pet) => {
          const isAvailable = pet.available;
          const isOldEnough =
            new Date().getTime() - new Date(pet.createdAt).getTime() >
            30 * 24 * 60 * 60 * 1000; // Más de 30 días
          return isAvailable && isOldEnough;
        });
        
        setPets(filterPets);
      } catch (err) {
        setError('Failed to fetch pets');
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
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
      <Slider {...settings}>
        {pets.map((pet) => (
          <div key={pet.petId} className="py-6 px-3">
            <AnimalCard pet={pet} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Destacados;
