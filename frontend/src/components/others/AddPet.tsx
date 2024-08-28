import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../others/ConfirmDialog";

interface AddPetProps {
  selectedCenter: number | null;
}

const AddPet: React.FC<AddPetProps> = ({ selectedCenter }) => {
  const [formData, setFormData] = useState({
    name: "",
    species: "dog",
    breed: "",
    age: "",
    gender: "male",
    description: "",
    available: true,
    photo: null as File | null
  });
  const [centers, setCenters] = useState<Array<{ center_id: number; name: string }>>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogAction, setDialogAction] = useState<() => void>(() => {});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/centers");
        if (response.ok) {
          const data = await response.json();
          setCenters(data);
        } else {
          throw new Error("Error fetching centers");
        }
      } catch (error) {
        console.error("Error fetching centers:", error);
      }
    };

    fetchCenters();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prevState => ({
        ...prevState,
        photo: e.target.files[0]
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedCenter === null) {
      setDialogTitle("Error");
      setDialogMessage("Debes seleccionar un refugio.");
      setDialogOpen(true);
      return;
    }

    const data = new FormData();
    data.append("center_id", String(selectedCenter));
    data.append("name", formData.name);
    data.append("species", formData.species);
    data.append("breed", formData.breed);
    data.append("age", formData.age);
    data.append("gender", formData.gender);
    data.append("description", formData.description);
    data.append("available", formData.available ? "1" : "0");
    if (formData.photo) {
      data.append("photo", formData.photo);
    }

    try {
      const response = await fetch("http://localhost:8080/api/pets", {
        method: "POST",
        body: data
      });

      if (response.ok) {
        setDialogTitle("Éxito");
        setDialogMessage("Animal añadido exitosamente.");
        setDialogAction(() => () => navigate("/")); 
        setDialogOpen(true);
      } else {
        const errorText = await response.text();
        setDialogTitle("Error");
        setDialogMessage("Error al añadir el animal: " + errorText);
        setDialogAction(() => () => window.location.reload());
        setDialogOpen(true);
      }
    } catch (error) {
      console.error("Error al añadir el animal:", error);
      setDialogTitle("Error");
      setDialogMessage("Ocurrió un error al añadir el animal.");
      setDialogAction(() => () => window.location.reload());
      setDialogOpen(true);
    }
  };

  return (
    <div className="w-1/2 p-6 m-4 shadow-md rounded-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Añadir Animal</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 text-sm">Selecciona un Refugio</label>
          <select
            name="center_id"
            className="w-full p-2 border rounded"
            value={selectedCenter ?? ""}
            onChange={(e) => setSelectedCenter(Number(e.target.value))}
            required
          >
            <option value="" disabled>Seleccione un refugio</option>
            {centers.map(center => (
              <option key={center.center_id} value={center.center_id}>
                {center.name}
              </option>
            ))}
          </select>
          <div className="mt-2">
            <a href="/create-center" className="text-blue-500 hover:underline">
              Crear nuevo refugio
            </a>
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm">Nombre del Animal</label>
          <input
            type="text"
            name="name"
            className="w-full p-2 border rounded"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm">Especie</label>
          <select
            name="species"
            className="w-full p-2 border rounded"
            value={formData.species}
            onChange={handleChange}
          >
            <option value="dog">Perro</option>
            <option value="cat">Gato</option>
            <option value="other">Otro</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm">Raza</label>
          <input
            type="text"
            name="breed"
            className="w-full p-2 border rounded"
            value={formData.breed}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm">Edad</label>
          <input
            type="number"
            name="age"
            className="w-full p-2 border rounded"
            value={formData.age}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm">Género</label>
          <select
            name="gender"
            className="w-full p-2 border rounded"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="male">Masculino</option>
            <option value="female">Femenino</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm">Descripción</label>
          <textarea
            name="description"
            className="w-full p-2 border rounded"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm">Disponible</label>
          <input
            type="checkbox"
            name="available"
            checked={formData.available}
            onChange={(e) => setFormData(prevState => ({
              ...prevState,
              available: e.target.checked
            }))}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm">Foto</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-gray-700 text-white rounded hover:bg-gray-800"
        >
          Añadir Animal
        </button>
      </form>

      {/* Diálogo de confirmación */}
      <ConfirmDialog
        open={dialogOpen}
        title={dialogTitle}
        message={dialogMessage}
        onClose={() => setDialogOpen(false)}
        onConfirm={() => {
          dialogAction();
          setDialogOpen(false);
        }}
      />
    </div>
  );
};

export default AddPet;
