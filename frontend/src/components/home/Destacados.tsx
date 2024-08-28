import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import AnimalCard from "../cards/AnimalCard";
import { Pet } from "../../interfaces/Pet";
import { getAllPets } from "../../api/pets";
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

const Destacados: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const petsData = await getAllPets();
        const daysToFilter = 365;
        const now = new Date().getTime();
        const daysInMillis = daysToFilter * 24 * 60 * 60 * 1000;

        const filterPets = petsData
          .filter((pet) => {
            const isAvailable = pet.available;
            const createdAtDate = new Date(pet.createdAt);

            if (isNaN(createdAtDate.getTime())) {
              console.error(`Invalid date: ${pet.createdAt}`);
              return false;
            }

            const isRecent = now - createdAtDate.getTime() <= daysInMillis;
            return isAvailable && isRecent;
          })
          .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

        setPets(filterPets);
      } catch (err) {
        setError("Failed to fetch pets");
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

  if (pets.length === 0) {
    return null;
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
      {pets.length >= 4 ? (
        <Slider {...settings}>
          {pets.map((pet) => (
            <div key={pet.petId} className="py-6 px-3">
              <AnimalCard pet={pet} />
            </div>
          ))}
        </Slider>
      ) : (
        <div className="flex justify-center flex-wrap">
          {pets.map((pet) => (
            <div key={pet.petId} className="py-6 px-3 card-width"> {/* Aplicar la clase card-width */}
              <AnimalCard pet={pet} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Destacados;
