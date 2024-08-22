import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from 'react-router-dom';
import ConfirmDialog from '../components/ConfirmDialog';
import { useNavigate } from 'react-router-dom';

interface State {
  stateId: number;
  name: string;
}

interface City {
  cityId: number;
  name: string;
  state: State;
}

const Profile: React.FC = () => {
  const { userData, login } = useAuth();
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [formState, setFormState] = useState(() => {
    const cityData = userData?.city && typeof userData.city !== 'string' ? userData.city as City : null;

    return {
      confirmPassword: "",
      email: userData?.email || "", // Maneja email
      address: userData?.address || "", // Maneja address que puede ser null
      city: cityData?.name?.toString() || "", // Maneja city que puede ser null
      state: cityData?.state?.stateId?.toString() || "", // Maneja state que puede ser null
      postalCode: userData?.postalCode?.toString() || "", // Maneja postalCode que puede ser null
      phoneNumber: userData?.phoneNumber || "", // Maneja phoneNumber que puede ser null
    };
  });

  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogAction, setDialogAction] = useState<() => void>(() => { });
  const navigate = useNavigate();

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogConfirm = () => {
    dialogAction();
    setDialogOpen(false);
  };

  useEffect(() => {
    const fetchStatesAndCities = async () => {
      const storedStates = localStorage.getItem("states");
      const storedCities = localStorage.getItem("cities");

      if (storedStates && storedCities) {
        setStates(JSON.parse(storedStates));
        setCities(JSON.parse(storedCities));
      } else {
        try {
          const [statesResponse, citiesResponse] = await Promise.all([
            fetch("http://localhost:8080/api/states"),
            fetch("http://localhost:8080/api/cities"),
          ]);

          const statesData = await statesResponse.json();
          const citiesData = await citiesResponse.json();

          setStates(statesData);
          setCities(citiesData);

          localStorage.setItem("states", JSON.stringify(statesData));
          localStorage.setItem("cities", JSON.stringify(citiesData));
        } catch (error) {
          console.error("Error fetching states and cities:", error);
        }
      }
    };

    fetchStatesAndCities();
  }, []);

  useEffect(() => {
    if (userData && typeof userData.city !== 'string') {
      const cityData = userData.city as City; // Forzar el tipo aquí

      setFormState((prevState) => ({
        ...prevState,
        email: userData.email || "",
        address: userData.address || "",
        city: cityData?.cityId?.toString() || "", // Asegúrate de que cityId existe
        state: cityData?.state?.stateId?.toString() || "", // Asegúrate de que state existe
        postalCode: userData.postalCode?.toString() || "",
        phoneNumber: userData.phoneNumber || "",
      }));

      const filtered = cities.filter(
        (city) => city.state.stateId === cityData?.state?.stateId
      );
      setFilteredCities(filtered);
    }
  }, [userData, states, cities]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStateId = e.target.value;

    setFormState((prevState) => ({
      ...prevState,
      state: selectedStateId,
      city: "",
    }));

    const filtered = cities.filter(
      (city) => city.state.stateId === parseInt(selectedStateId, 10)
    );
    setFilteredCities(filtered);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCityId = e.target.value;

    setFormState((prevState) => ({
      ...prevState,
      city: selectedCityId,
    }));

    const selectedCity = cities.find(
      (city) => city.cityId === parseInt(selectedCityId, 10)
    );

    if (selectedCity) {
      setFormState((prevState) => ({
        ...prevState,
        state: selectedCity.state.stateId.toString(),
      }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedImage(file);

      // Crear una URL de objeto para la previsualización de la imagen
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userData) {
      console.error("No user data available");
      return;
    }

    try {
      const tokenResponse = await fetch("http://localhost:8080/api/auth/token", {
        method: "GET",
      });

      if (!tokenResponse.ok) {
        throw new Error("Failed to obtain token");
      }

      const token = await tokenResponse.text();

      const formData = new FormData();

      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      if (formState.email !== userData?.email) {
        formData.append("email", formState.email);
      }
      if (formState.address !== userData?.address) {
        formData.append("address", formState.address);
      }
      if (userData.city && typeof userData.city !== 'string') {
        const cityData = userData.city as City; // Forzar el tipo aquí

        if (formState.city !== cityData.cityId.toString()) {
          formData.append("cityId", formState.city);
        }
        if (formState.state !== cityData.state.stateId.toString()) {
          formData.append("stateId", formState.state);
        }
      }
      if (formState.postalCode !== userData?.postalCode?.toString()) {
        formData.append("postalCode", formState.postalCode);
      }
      if (formState.phoneNumber !== userData?.phoneNumber) {
        formData.append("phoneNumber", formState.phoneNumber);
      }

      const response = await fetch(
        `http://localhost:8080/protected/api/users/${userData?.userId}`,
        {
          method: "PATCH",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const updatedDataResponse = await fetch(
          `http://localhost:8080/protected/api/users/${userData?.userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (updatedDataResponse.ok) {
          const updatedUserData = await updatedDataResponse.json();

          localStorage.setItem("userData", JSON.stringify(updatedUserData));
          login(updatedUserData, token);

          setDialogTitle('Perfil Actualizado');
          setDialogMessage('Perfil actualizado exitosamente.');
          setDialogAction(() => () => window.location.reload());
          setDialogOpen(true);
        } else {
          // Configurar el diálogo para el error al obtener los datos actualizados
          setDialogTitle('Error');
          setDialogMessage('Error al obtener los datos actualizados.');
          setDialogAction(() => () => navigate('/'));
          setDialogOpen(true);
        }
      } else {
        const errorText = await response.text();
        setDialogTitle('Error');
        setDialogMessage(`Error al actualizar el perfil: ${errorText}`);
        setDialogAction(() => () => window.location.reload());
        setDialogAction(() => () => navigate('/'));
        setDialogOpen(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setDialogTitle('Error');
      setDialogMessage(`Ocurrió un error al actualizar el perfil: ${error}`);
      setDialogAction(() => () => navigate('/'));
      setDialogOpen(true);
    }
  };

  if (!userData) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col lg:flex-row bg-white gap-4 overflow-hidden">
        <div className="flex flex-col items-center p-6 bg-gray-100 lg:w-1/3 lg:max-h-[400px] h-auto shadow-lg rounded-lg flex-shrink-0">
          <img
            src={previewImage || `data:image/jpeg;base64,${userData.image}`}
            alt="Perfil"
            className="w-32 h-32 rounded-full object-cover mb-4"
          />
          <h2 className="text-xl font-semibold mb-2">{userData.username}</h2>
          <button
            type="button"
            onClick={() => document.getElementById("imageUpload")?.click()}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-2"
          >
            Subir Nueva Foto
          </button>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <p className="text-sm text-gray-400 text-center mt-4">
            Sube una nueva imagen de perfil.
            <br />
            El tamaño máximo de la imagen es de 16 MB.
          </p>
          <Link
            to="/resetpassword"
            className="text-blue-500 hover:underline text-sm mt-4"
          >
            Cambiar Contraseña
          </Link>
        </div>
        <div className="p-6 lg:w-2/3 rounded-lg shadow-lg me-2 mb-4">
          <h3 className="text-2xl font-semibold mb-6">Editar Perfil</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Nombre de Usuario</label>
              <input
                type="text"
                name="username"
                value={userData.username || ""}
                readOnly
                className="w-full p-3 border rounded bg-gray-200 cursor-not-allowed"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Correo Electrónico</label>
              <input
                type="email"
                name="email"
                value={formState.email}
                onChange={handleInputChange}
                className="w-full p-3 border rounded"
              />
            </div>
            <h4 className="text-xl font-semibold mb-4 mt-6">Información de Dirección</h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Dirección</label>
                <input
                  type="text"
                  name="address"
                  value={formState.address}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Provincia</label>
                <select
                  className="w-full p-3 border rounded"
                  value={formState.state}
                  onChange={handleStateChange}
                >
                  <option value="">Selecciona una provincia</option>
                  {states.map((state) => (
                    <option key={state.stateId} value={state.stateId.toString()}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Ciudad</label>
                <select
                  className="w-full p-3 border rounded"
                  value={formState.city}
                  onChange={handleCityChange}
                >
                  <option value="">Selecciona un municipio</option>
                  {filteredCities.map((city) => (
                    <option key={city.cityId} value={city.cityId}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Código Postal</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formState.postalCode}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Número de Teléfono</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formState.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Actualizar Información
            </button>
          </form>
        </div>
      </div>
      <div className="container mx-auto p-6">
        <ConfirmDialog
          open={dialogOpen}
          title={dialogTitle}
          message={dialogMessage}
          isError={dialogTitle === 'Error'}
          onClose={handleDialogClose}
          onConfirm={handleDialogConfirm}
        />
      </div>
    </div>
  );
};

export default Profile;
