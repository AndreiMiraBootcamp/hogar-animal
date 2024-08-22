import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 ">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-wrap justify-between">
          
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-lg font-semibold mb-4">Hogar Animal</h2>
            <p className="text-sm mb-4">
              &copy; 2024 Hogar Animal. Todos los derechos reservados.
            </p>
            <p className="text-sm">
              Teléfono: +34 644 45 67 88
            </p>
            <p className="text-sm">
              Email: contacto@hogaranimal.com
            </p>
          </div>

          
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2 className="text-lg font-semibold mb-4">Enlaces</h2>
            <ul>
              <li><a href="/" className="text-sm hover:underline">Inicio</a></li>
              <li><a href="/about" className="text-sm hover:underline">Sobre Nosotros</a></li>
              <li><a href="/colabora" className="text-sm hover:underline">Contacto</a></li>
              <li><a href="/privacity" className="text-sm hover:underline">Política de Privacidad</a></li>
              <li><a href="/terms" className="text-sm hover:underline">Términos de Servicio</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

