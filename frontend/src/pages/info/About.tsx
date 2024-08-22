import React from 'react';

const About: React.FC = () => {
  return (
    <div className="p-6 space-y-8">
      {/* Título de la sección */}
      <h2 className="text-3xl font-bold mb-6">Sobre Nosotros</h2>

      {/* Introducción */}
      <div className="flex flex-col md:flex-row md:space-x-8">
        <div className="flex-shrink-0">
        <img 
          src="/images/group.jpeg" 
          alt="Imagen de Hogar Animal" 
          className="w-[400px] h-[300px] object-cover rounded-lg shadow-md"
        />

        </div>
        <div className="mt-4 md:mt-0">
          <p className="text-lg">
            Hogar Animal es una iniciativa dedicada a ayudar a los animales en situación de abandono, facilitando la conexión entre personas interesadas en adoptar y los refugios que cuidan a estos animales. Nuestro objetivo es proporcionar una plataforma fácil de usar para que más animales encuentren un hogar amoroso.
          </p>
          <p className="mt-4 text-lg">
            Trabajamos con una red de refugios y voluntarios comprometidos para asegurar que cada animal reciba el cuidado y el amor que merece. Además, organizamos eventos y campañas para promover la adopción y la educación sobre el bienestar animal.
          </p>
        </div>
      </div>

      {/* Misión */}
      <section className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold mb-4">Nuestra Misión</h3>
        <p className="text-lg">
          En Hogar Animal, nuestra misión es mejorar la vida de los animales en situación de abandono a través de la adopción responsable y el compromiso con la comunidad. Creemos en un futuro donde cada animal tenga un hogar seguro y amoroso.
        </p>
      </section>

      <section>
        <h3 className="text-2xl font-semibold mb-4">Conoce a Nuestro Equipo</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <img 
              src="/images/rafel.jpeg" 
              alt="Rafel" 
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h4 className="text-xl font-semibold">Rafel</h4>
            <p className="text-gray-600">Frontend Developer</p>
            <p className="mt-2">
              Rafel es uno de nuestros desarrolladores frontend, especializado en crear interfaces de usuario intuitivas y atractivas. Su experiencia en tecnologías web asegura que nuestras plataformas sean fáciles de usar y visualmente agradables.
            </p>
          </div>

          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <img 
              src="/images/anouar.jpeg" 
              alt="Anouar" 
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h4 className="text-xl font-semibold">Anouar</h4>
            <p className="text-gray-600">Frontend Developer</p>
            <p className="mt-2">
              Anouar es nuestro experto en frontend, con un enfoque en la optimización y el diseño responsivo. Se asegura de que nuestras aplicaciones sean accesibles y funcionales en todos los dispositivos.
            </p>
          </div>

          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <img 
              src="/images/andrei.jpeg" 
              alt="Andrei" 
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h4 className="text-xl font-semibold">Andrei</h4>
            <p className="text-gray-600">Backend Developer</p>
            <p className="mt-2">
              Andrei es nuestro desarrollador backend, especializado en la creación y mantenimiento de servicios robustos y eficientes. Su experiencia asegura que nuestros sistemas sean seguros y escalables.
            </p>
          </div>

         
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <img 
              src="/images/mihail.jpeg" 
              alt="Mihail" 
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h4 className="text-xl font-semibold">Mihail</h4>
            <p className="text-gray-600">Backend Developer</p>
            <p className="mt-2">
              Mihail trabaja en el desarrollo backend con un enfoque en la optimización del rendimiento y la integración de sistemas. Su habilidad en la arquitectura de software y bases de datos es clave para el éxito de nuestros proyectos.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
