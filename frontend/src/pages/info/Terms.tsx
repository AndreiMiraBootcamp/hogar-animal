import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="mt-5 mb-5 mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Términos de Servicio</h1>
      <p className="text-lg text-gray-700 mb-6">
        Bienvenido a Hogar Animal. Al acceder o utilizar nuestro sitio web <a href="https://www.hogar-animal.com" className="text-blue-500 hover:underline">www.hogar-animal.com</a>, aceptas cumplir y estar sujeto a los siguientes términos y condiciones ("Términos de Servicio"). Si no estás de acuerdo con estos términos, no debes utilizar nuestro sitio.
      </p>

      <h2 className="text-3xl font-semibold text-gray-800 mb-4">1. Uso del Sitio</h2>
      <p className="text-lg text-gray-700 mb-4">
        Nuestro sitio está destinado para ser utilizado con fines informativos y para la provisión de servicios relacionados con Hogar Animal. Al usar nuestro sitio, te comprometes a no:
        <ul className="list-disc list-inside ml-6 mt-2 text-gray-700">
          <li>Violar cualquier ley o regulación aplicable.</li>
          <li>Infringir los derechos de propiedad intelectual de terceros.</li>
          <li>Transmitir cualquier contenido que sea ilegal, ofensivo, o dañino.</li>
          <li>Interferir con el funcionamiento del sitio o el acceso de otros usuarios.</li>
        </ul>
      </p>

      <h2 className="text-3xl font-semibold text-gray-800 mb-4">2. Propiedad Intelectual</h2>
      <p className="text-lg text-gray-700 mb-4">
        Todos los contenidos del sitio, incluidos pero no limitados a textos, gráficos, logotipos, imágenes y software, son propiedad de Hogar Animal o sus licenciantes y están protegidos por las leyes de derechos de autor y otras leyes de propiedad intelectual. No puedes reproducir, distribuir, modificar o crear obras derivadas de ningún contenido del sitio sin nuestro consentimiento expreso por escrito.
      </p>

      <h2 className="text-3xl font-semibold text-gray-800 mb-4">3. Enlaces a Sitios de Terceros</h2>
      <p className="text-lg text-gray-700 mb-4">
        Nuestro sitio puede contener enlaces a sitios web de terceros que no son propiedad ni están controlados por Hogar Animal. No somos responsables del contenido o las prácticas de privacidad de estos sitios, y el acceso a ellos es bajo tu propio riesgo.
      </p>

      <h2 className="text-3xl font-semibold text-gray-800 mb-4">4. Limitación de Responsabilidad</h2>
      <p className="text-lg text-gray-700 mb-4">
        En la medida máxima permitida por la ley, Hogar Animal no será responsable por ningún daño directo, indirecto, incidental, especial o consecuente que resulte del uso o la imposibilidad de uso de nuestro sitio o los servicios proporcionados. Esto incluye, sin limitación, la pérdida de beneficios, datos o cualquier otra pérdida intangible.
      </p>

      <h2 className="text-3xl font-semibold text-gray-800 mb-4">5. Modificaciones a los Términos</h2>
      <p className="text-lg text-gray-700 mb-4">
        Podemos modificar estos Términos de Servicio en cualquier momento. Cualquier cambio será efectivo inmediatamente después de su publicación en esta página. Es tu responsabilidad revisar periódicamente estos términos para estar informado de cualquier cambio. Al continuar usando el sitio después de la publicación de las modificaciones, aceptas los términos revisados.
      </p>

      <h2 className="text-3xl font-semibold text-gray-800 mb-4">6. Terminación</h2>
      <p className="text-lg text-gray-700 mb-4">
        Nos reservamos el derecho de terminar o suspender tu acceso a nuestro sitio, sin previo aviso, por cualquier razón, incluyendo, pero no limitado a, la violación de estos Términos de Servicio.
      </p>

      <h2 className="text-3xl font-semibold text-gray-800 mb-4">7. Ley Aplicable</h2>
      <p className="text-lg text-gray-700 mb-4">
        Estos Términos de Servicio se regirán e interpretarán de acuerdo con las leyes de [Tu País], sin tener en cuenta sus disposiciones sobre conflictos de leyes.
      </p>

      <h2 className="text-3xl font-semibold text-gray-800 mb-4">8. Contacto</h2>
      <p className="text-lg text-gray-700">
        Si tienes alguna pregunta o inquietud sobre estos Términos de Servicio, por favor contáctanos a:
        <br />
        <strong className="font-semibold text-gray-800">Email:</strong> <a href="mailto:contacto@hogaranimal.com" className="text-blue-500 hover:underline">contacto@hogaranimal.com</a>
        <br />
        <strong className="font-semibold text-gray-800">Dirección:</strong> Calle Ejemplo 123, Ciudad, País
      </p>
    </div>
  );
};

export default TermsOfService;
