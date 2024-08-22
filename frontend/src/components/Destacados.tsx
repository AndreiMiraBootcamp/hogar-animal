import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import AnimalCard, { Pet } from "./AnimalCard";
import petData from "../JSON/pet.json";
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

  useEffect(() => {
    // Filtrar los datos para obtener solo los animales disponibles y que han sido publicados hace un tiempo
    const filterPets = petData.filter((pet) => {
      const isAvailable = pet.available;
      const isOldEnough =
        new Date().getTime() - new Date(pet.created_at).getTime() >
        30 * 24 * 60 * 60 * 1000; // Más de 30 días
      return isAvailable && isOldEnough;
    });
    setPets(filterPets);
  }, []);

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
          <div key={pet.pet_id} className="px-2">
            <AnimalCard pet={pet} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Destacados;
