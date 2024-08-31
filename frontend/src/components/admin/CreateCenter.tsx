import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  InputLabel,
  DialogContentText,
} from "@mui/material";
import { styled } from "@mui/material/styles";

interface CreateCenterProps {
  open: boolean;
  onClose: () => void;
  onCenterCreated: () => void;
}

// Styled InputLabel with background and padding
const StyledInputLabel = styled(InputLabel)({
  backgroundColor: "white",
  padding: "0 4px",
  left: "-4px",
  zIndex: 1,
});

const CreateCenter: React.FC<CreateCenterProps> = ({ open, onClose, onCenterCreated }) => {
  const initialFormData = {
    name: "",
    address: "",
    cityName: "",
    postal_code: "",
    phone: "",
    website: "",
    foundation_year: "",
    photoURL: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [cities, setCities] = useState<Array<{ cityId: number; name: string }>>([]);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  useEffect(() => {
    if (!open) {
      setFormData(initialFormData);
      setSelectedImages([]); // Limpiar las imágenes seleccionadas
    }
  }, [open]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/cities");
        if (response.ok) {
          const data = await response.json();
          setCities(data);
        } else {
          throw new Error("Error fetching cities");
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const images = files.map((file) => URL.createObjectURL(file));
      setSelectedImages(images);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Obtener el userId desde localStorage
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const userId = userData?.userId;

    if (!userId) {
      alert("No se pudo obtener el ID de usuario. Por favor, inicie sesión nuevamente.");
      return;
    }

    // Buscar el city_id a partir del nombre de la ciudad
    const city = cities.find(
      (city) => city.name.toLowerCase() === formData.cityName.toLowerCase()
    );

    if (!city) {
      alert("Ciudad no encontrada.");
      return;
    }

    const data = {
      name: formData.name,
      address: formData.address,
      city: {
        cityId: city.cityId,
      },
      postalCode: formData.postal_code,
      phone: formData.phone,
      website: formData.website,
      foundationYear: parseInt(formData.foundation_year, 10),
      photoUrl: formData.photoURL,
      userId: userId,
    };

    try {
      const response = await fetch("http://localhost:8080/api/adoption-centers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setConfirmationDialogOpen(true); // Mostrar diálogo de confirmación
      } else {
        const errorText = await response.text();
        alert("Error al crear el refugio: " + errorText);
      }
    } catch (error) {
      console.error("Error al crear el refugio:", error);
      alert("Ocurrió un error al crear el refugio.");
    }
  };

  const handleConfirmationClose = () => {
    setConfirmationDialogOpen(false);
    onClose(); // Cerrar el formulario de crear centro
    onCenterCreated(); // Llamar a la función de callback para indicar que el centro ha sido creado
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Crear Refugio</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Nombre del Refugio"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Dirección"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Nombre de la Ciudad"
              name="cityName"
              value={formData.cityName}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Código Postal"
              name="postal_code"
              value={formData.postal_code}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Teléfono"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Sitio Web"
              name="website"
              value={formData.website}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Año de Fundación"
              name="foundation_year"
              type="number"
              value={formData.foundation_year}
              onChange={handleChange}
            />

            {/* Campo para subir imágenes dentro de una caja con borde */}
            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "10px",
                marginTop: "20px",
              }}
            >
              <StyledInputLabel id="images-label" style={{ marginBottom: "10px" }}>
                Imágenes
              </StyledInputLabel>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                style={{ marginBottom: "10px" }}
              />
              <div
                className="image-preview"
                style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
              >
                {selectedImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Preview ${index + 1}`}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  />
                ))}
              </div>
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Crear Refugio
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo de confirmación */}
      <Dialog open={confirmationDialogOpen} onClose={handleConfirmationClose}>
        <DialogTitle>Refugio Creado</DialogTitle>
        <DialogContent>
          <DialogContentText>
            El refugio ha sido creado exitosamente.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmationClose} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateCenter;
