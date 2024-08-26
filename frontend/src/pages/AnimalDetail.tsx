import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Slider from "react-slick";
import { getPetById } from '../api/pets';
import { Pet } from '../interfaces/Pet';
import { FaPaw, FaInfoCircle } from 'react-icons/fa';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { translateSpecies, translateGender } from '../utils/translation'; // Importa las funciones de traducción

const AnimalDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [carouselImages, setCarouselImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>(''); // Estado para la imagen seleccionada

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        if (id) {
          const petData = await getPetById(Number(id));
          setPet(petData);
          loadCarouselImages(petData.petId);
        }
      } catch (err) {
        setError('Failed to fetch pet data');
      } finally {
        setLoading(false);
      }
    };

    const loadCarouselImages = (petId: number) => {
      const images: string[] = [];
      for (let i = 1; i <= 4; i++) {
        images.push(`/images/pets/pet_${petId}/pet_${i}.jpg`);
      }
      setCarouselImages(images);
      setSelectedImage(`/images/pets/pet_${petId}/pet_1.jpg`); // Establecer la primera imagen como la predeterminada
    };

    fetchPetData();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-10 text-2xl font-semibold text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-2xl font-semibold text-red-500">Error: {error}</div>;
  }

  if (!pet) {
    return <div className="text-center mt-10 text-2xl font-semibold text-gray-600">No se encontró el animal.</div>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className="mx-10 my-20 p-6 flex flex-col lg:flex-row items-center lg:items-start bg-gradient-to-r from-blue-50 to-blue-100 shadow-2xl rounded-lg">
      <div className="w-full lg:w-1/2 lg:mr-8">
        {/* Imagen grande principal */}
        <img
          src={selectedImage}
          alt={pet.name}
          className="w-full h-4/5 object-cover mb-6 rounded-xl shadow-lg "
        />

        {/* Carrusel de Imágenes */}
        <div className="w-full mt-4 px-4">
          <Slider {...settings}>
            {carouselImages.map((src, index) => (
              <div key={index} className="p-1">
                <img
                  src={src}
                  alt={`Imagen ${index + 1} de ${pet.name}`}
                  className="w-full h-28 object-cover rounded-lg shadow-md transform transition-transform hover:scale-105 cursor-pointer"
                  onClick={() => setSelectedImage(src)} // Cambiar la imagen principal al hacer clic
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div className="w-full lg:w-1/2 p-4 bg-white rounded-xl shadow-lg space-y-6">
        <h1 className="text-4xl font-extrabold mb-4 text-blue-800 flex items-center">
          <FaPaw className="mr-3 text-blue-600" /> {pet.name}
        </h1>
        <p className="text-lg text-gray-700"><strong>Especie:</strong> {translateSpecies(pet.species)}</p>
        <p className="text-lg text-gray-700"><strong>Raza:</strong> {pet.breed}</p>
        <p className="text-lg text-gray-700"><strong>Edad:</strong> {pet.age} años</p>
        <p className="text-lg text-gray-700"><strong>Sexo:</strong> {translateGender(pet.gender)}</p>
        <p className="text-lg text-gray-700"><strong>Descripción:</strong> {pet.description}</p>
        <p className="text-lg text-gray-700"><strong>Disponibilidad:</strong> {pet.available ? 'Disponible' : 'No Disponible'}</p>

        <button className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-full shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105 flex items-center justify-center">
          <FaInfoCircle className="mr-2" /> Adoptar / Solicitar Información
        </button>
      </div>
    </div>
  );
};

export default AnimalDetail;
