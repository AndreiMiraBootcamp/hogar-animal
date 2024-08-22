import React, { useState } from "react";

const Contacto: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Enviando...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el mensaje.");
      }

      setStatus("¡Mensaje enviado con éxito! Gracias por contactarnos.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("Hubo un problema al enviar el mensaje. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="w-full flex flex-col items-center p-8">
      <div className="w-full max-w-5xl shadow-md rounded-lg p-8 mb-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Contáctanos
        </h2>
        <p className="text-lg text-gray-600 mb-6 text-center">
          Si tienes preguntas, sugerencias, o simplemente quieres colaborar, no dudes en ponerte en contacto con nosotros. Rellena el formulario con tu información de contacto y tu mensaje y nos pondremos en contacto contigo lo antes posible.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mensaje</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              rows={6}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
          >
            Enviar Mensaje
          </button>
          {status && <p className="mt-4 text-center text-gray-700">{status}</p>}
        </form>
      </div>

      <div className="w-full max-w-5xl bg-white shadow-md rounded-lg p-8">
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Cómo Puedes Colaborar
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="p-6 bg-gray-100 rounded-lg text-center">
            <h4 className="text-xl font-semibold text-gray-800 mb-4">
              Haz una Donación
            </h4>
            <p className="text-gray-600 mb-4">
              Con tu apoyo financiero, podemos ofrecer una mejor atención a los animales en nuestros refugios.
            </p>
          </div>

          <div className="p-6 bg-gray-100 rounded-lg text-center">
            <h4 className="text-xl font-semibold text-gray-800 mb-4">
              Únete como Voluntario
            </h4>
            <p className="text-gray-600 mb-4">
              Tu tiempo es valioso. Ayúdanos directamente en los refugios como voluntario.
            </p>
          </div>
          
          <div className="p-6 bg-gray-100 rounded-lg text-center">
            <h4 className="text-xl font-semibold text-gray-800 mb-4">
              Comparte Nuestra Misión
            </h4>
            <p className="text-gray-600 mb-4">
              Ayúdanos a difundir nuestro trabajo compartiendo en tus redes sociales.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
