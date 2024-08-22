import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="mt-5 mb-5 mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Política de Privacidad</h1>
      <p className="text-lg text-gray-700 mb-6">
        En Hogar Animal, valoramos tu privacidad y estamos comprometidos en protegerla. Esta Política de Privacidad explica cómo recopilamos, usamos, compartimos y protegemos tu información personal cuando visitas nuestro sitio web <a href="https://www.hogar-animal.com" className="text-blue-500 hover:underline">www.hogar-animal.com</a>.
      </p>

      <h2 className="text-3xl font-semibold text-gray-800 mb-4">1. Información que Recopilamos</h2>
      <p className="text-lg text-gray-700 mb-4">
        Recopilamos información personal que tú nos proporcionas directamente, como tu nombre, dirección de correo electrónico y cualquier otra información que decides compartir con nosotros. También recopilamos información automáticamente a través de cookies y otras tecnologías de seguimiento, como tu dirección IP, el tipo de navegador, y la fecha y hora de tu visita.
      </p>

      <h2 className="text-3xl font-semibold text-gray-800 mb-4">2. Cómo Usamos Tu Información</h2>
      <p className="text-lg text-gray-700 mb-4">
        Usamos la información que recopilamos para:
        <ul className="list-disc list-inside ml-6 mt-2 text-gray-700">
          <li>Proporcionar y mantener nuestro Sitio.</li>
          <li>Mejorar nuestro Sitio y personalizar tu experiencia.</li>
          <li>Comunicarte con nosotros sobre actualizaciones, promociones y otros temas relevantes.</li>
          <li>Responder a tus preguntas y proporcionar soporte al cliente.</li>
        </ul>
      </p>

      <h2 className="text-3xl font-semibold text-gray-800 mb-4">3. Compartir Tu Información</h2>
      <p className="text-lg text-gray-700 mb-4">
        Podemos compartir tu información con terceros en las siguientes circunstancias:
        <ul className="list-disc list-inside ml-6 mt-2 text-gray-700">
          <li>Con proveedores de servicios que nos ayudan a operar nuestro Sitio y realizar nuestros servicios.</li>
          <li>Si estamos obligados a hacerlo por ley o en respuesta a una solicitud legal.</li>
          <li>En caso de una fusión, adquisición o venta de activos, en cuyo caso la información será transferida a la nueva entidad.</li>
        </ul>
      </p>

      <h2 className="text-3xl font-semibold text-gray-800 mb-4">4. Seguridad de Tu Información</h2>
      <p className="text-lg text-gray-700 mb-4">
        Implementamos medidas de seguridad razonables para proteger tu información personal de accesos no autorizados, alteraciones y divulgaciones. Sin embargo, ninguna medida de seguridad es completamente infalible, y no podemos garantizar la seguridad absoluta de tu información.
      </p>

      <h2 className="text-3xl font-semibold text-gray-800 mb-4">5. Tus Derechos</h2>
      <p className="text-lg text-gray-700 mb-4">
        Dependiendo de tu ubicación, puedes tener derechos relacionados con tu información personal, como el derecho a acceder, corregir o eliminar tus datos. Si deseas ejercer alguno de estos derechos, por favor contáctanos a través de la información de contacto proporcionada a continuación.
      </p>

      <h2 className="text-3xl font-semibold text-gray-800 mb-4">6. Cambios a Esta Política de Privacidad</h2>
      <p className="text-lg text-gray-700 mb-4">
        Podemos actualizar esta Política de Privacidad de vez en cuando. Publicaremos cualquier cambio en esta página y te notificaremos si es necesario. Te recomendamos revisar esta página periódicamente para estar informado sobre cómo protegemos tu información.
      </p>

      <h2 className="text-3xl font-semibold text-gray-800 mb-4">7. Contacto</h2>
      <p className="text-lg text-gray-700">
        Si tienes alguna pregunta sobre esta Política de Privacidad, por favor contáctanos a:
        <br />
        <strong className="font-semibold text-gray-800">Email:</strong> <a href="mailto:contacto@hogaranimal.com" className="text-blue-500 hover:underline">contacto@hogaranimal.com</a>
        <br />
        <strong className="font-semibold text-gray-800">Dirección:</strong> Calle Ejemplo 123, Ciudad, País
      </p>
    </div>
  );
};

export default PrivacyPolicy;

