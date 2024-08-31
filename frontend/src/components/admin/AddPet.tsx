import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Checkbox,
  FormControlLabel,
  DialogContentText,
} from "@mui/material";
import { styled } from "@mui/material/styles";

interface AddPetProps {
  selectedCenter: number | null;
  open: boolean;
  onClose: () => void;
}

// Styled InputLabel with background and padding
const StyledInputLabel = styled(InputLabel)({
  backgroundColor: "white",
  padding: "0 4px",
  left: "-4px",
  zIndex: 1,
});

const AddPet: React.FC<AddPetProps> = ({ selectedCenter, open, onClose }) => {
  const initialFormData = {
    name: "",
    species: "dog",
    breed: "",
    age: "",
    gender: "male",
    description: "",
    available: true,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  // Resetear el formulario cada vez que se cierra el diálogo
  useEffect(() => {
    if (!open) {
      setFormData(initialFormData);
      setSelectedImages([]); // Limpiar las imágenes seleccionadas
    }
  }, [open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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

    if (selectedCenter === null || selectedCenter === undefined) {
      alert("Debes seleccionar un refugio.");
      return;
    }

    // Crear el objeto de datos para enviar
    const data = {
      name: formData.name,
      species: formData.species,
      breed: formData.breed,
      age: Number(formData.age), // Asegúrate de que la edad sea un número
      gender: formData.gender,
      description: formData.description,
      available: formData.available,
      centerId: selectedCenter,
    };

    try {
      const response = await fetch("http://localhost:8080/api/pets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Establecer el encabezado Content-Type como application/json
        },
        body: JSON.stringify(data), // Convertir el objeto de datos a JSON
      });

      if (response.ok) {
        setConfirmationDialogOpen(true); // Mostrar diálogo de confirmación
      } else {
        const errorText = await response.text();
        alert("Error al añadir el animal: " + errorText);
      }
    } catch (error) {
      console.error("Error al añadir el animal:", error);
      alert("Ocurrió un error al añadir el animal.");
    }
  };

  const handleConfirmationClose = () => {
    setConfirmationDialogOpen(false);
    onClose(); // Cerrar el formulario de añadir animal
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Añadir Animal</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Nombre del Animal"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <FormControl fullWidth margin="normal">
              <StyledInputLabel id="species-label">Especie</StyledInputLabel>
              <Select
                labelId="species-label"
                name="species"
                value={formData.species}
                onChange={handleChange}
              >
                <MenuItem value="dog">Perro</MenuItem>
                <MenuItem value="cat">Gato</MenuItem>
                <MenuItem value="other">Otro</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              margin="normal"
              label="Raza"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Edad"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
            />
            <FormControl fullWidth margin="normal">
              <StyledInputLabel id="gender-label">Género</StyledInputLabel>
              <Select
                labelId="gender-label"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <MenuItem value="male">Masculino</MenuItem>
                <MenuItem value="female">Femenino</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              margin="normal"
              label="Descripción"
              name="description"
              multiline
              rows={4}
              value={formData.description}
              onChange={handleChange}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.available}
                  onChange={(e) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      available: e.target.checked,
                    }))
                  }
                  name="available"
                />
              }
              label="Disponible"
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
            Añadir Animal
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo de confirmación */}
      <Dialog open={confirmationDialogOpen} onClose={handleConfirmationClose}>
        <DialogTitle>Animal Creado</DialogTitle>
        <DialogContent>
          <DialogContentText>
            El animal ha sido añadido exitosamente.
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

export default AddPet;
