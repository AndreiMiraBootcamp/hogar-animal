import React from 'react';

const tips = [
  { title: "Investiga", description: "Infórmate sobre las diferentes razas y sus necesidades." },
  { title: "Evalúa tu hogar", description: "Asegúrate de que tu hogar sea adecuado para la mascota." },
  { title: "Considera tu tiempo", description: "Evalúa el tiempo que puedes dedicar al cuidado de la mascota." },
  { title: "Visita a la mascota", description: "Conoce a la mascota antes de tomar la decisión final." },
  { title: "Prepara todo", description: "Asegúrate de tener todos los suministros necesarios." }
];

const warnings = [
  { title: "Compromiso a largo plazo", description: "La adopción es un compromiso a largo plazo, asegúrate de estar listo." },
  { title: "Costos", description: "Considera los gastos relacionados con el cuidado de la mascota." },
  { title: "Alergias", description: "Asegúrate de que nadie en tu hogar tenga alergias a las mascotas." },
  { title: "Adaptación", description: "Ten paciencia durante el período de adaptación de la mascota." },
  { title: "Responsabilidad", description: "Asume la responsabilidad de cuidar a tu mascota adecuadamente." }
];

const AdoptionTips: React.FC = () => {
  return (
    <section className="w-full py-4 bg-white my-6">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4">Consejos para Adoptar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tips.map((tip, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{index + 1}. {tip.title}</h3>
              <p className="text-gray-700">{tip.description}</p>
            </div>
          ))}
        </div>
        
        <h2 className="text-2xl font-bold mt-6 mb-4">Advertencias</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {warnings.map((warning, index) => (
            <div key={index} className="bg-gray-300 p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{index + 1}. {warning.title}</h3>
              <p className="text-gray-700">{warning.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdoptionTips;
