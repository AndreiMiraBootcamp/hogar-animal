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

interface EditCenterProps {
  open: boolean;
  centerId: number;
  onClose: () => void;
  onCenterUpdated: () => void;
}

const StyledInputLabel = styled(InputLabel)({
  backgroundColor: "white",
  padding: "0 4px",
  left: "-4px",
  zIndex: 1,
});

const EditCenter: React.FC<EditCenterProps> = ({
  open,
  centerId,
  onClose,
  onCenterUpdated,
}) => {
  const initialFormData = {
    name: "",
    address: "",
    cityName: "",
    postal_code: "",
    phone: "",
    website: "",
    foundation_year: "",
    photoURL: "",
    latitude: "",
    longitude: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [cities, setCities] = useState<Array<{ cityId: number; name: string; stateId: number }>>([]);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");

  useEffect(() => {
    if (centerId && open) {
      const fetchCenterDetails = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/adoption-centers/${centerId}`);
          const center = await response.json();
          setFormData({
            name: center.name,
            address: center.address,
            cityName: center.city?.name || "",
            postal_code: center.postalCode,
            phone: center.phone,
            website: center.website,
            foundation_year: center.foundationYear.toString(),
            photoURL: center.photoUrl,
            latitude: center.latitude.toString(),
            longitude: center.longitude.toString(),
          });
        } catch (error) {
          console.error("Error fetching center details:", error);
        }
      };

      fetchCenterDetails();
    }
  }, [centerId, open]);

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

    if (name === "cityName") {
      const selectedCity = cities.find(
        (city) => city.name.toLowerCase() === value.toLowerCase()
      );

      if (selectedCity) {
        setFormData((prevState) => ({
          ...prevState,
          cityId: selectedCity.cityId.toString(),
          stateId: selectedCity.stateId.toString(),
        }));
      } else {
        setFormData((prevState) => ({
          ...prevState,
          cityId: "",
          stateId: "",
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const userId = userData?.userId;

    if (!userId) {
      alert("No se pudo obtener el ID de usuario. Por favor, inicie sesión nuevamente.");
      return;
    }

    const city = cities.find(
      (city) => city.name.toLowerCase() === formData.cityName.toLowerCase()
    );

    if (!city) {
      alert("Ciudad no encontrada.");
      return;
    }

    const data = {
      centerId,
      name: formData.name,
      address: formData.address,
      city: {
        cityId: city.cityId,
        name: city.name,
        state: { stateId: city.stateId },
      },
      postalCode: formData.postal_code,
      phone: formData.phone,
      website: formData.website,
      foundationYear: parseInt(formData.foundation_year, 10),
      photoUrl: formData.photoURL,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
      userId,
    };

    try {
      const response = await fetch(`http://localhost:8080/api/adoption-centers/${centerId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setDialogTitle("Éxito");
        setDialogMessage("Refugio actualizado exitosamente.");
        setConfirmationDialogOpen(true);
        onCenterUpdated();  // Esto se ejecutará después de que se haya actualizado el centro correctamente
      } else {
        const errorText = await response.text();
        setDialogTitle("Error");
        setDialogMessage("Error al actualizar el refugio: " + errorText);
        setConfirmationDialogOpen(true);
      }
    } catch (error) {
      console.error("Error al actualizar el refugio:", error);
      setDialogTitle("Error");
      setDialogMessage("Ocurrió un error al actualizar el refugio.");
      setConfirmationDialogOpen(true);
    }
  };

  const handleConfirmationClose = () => {
    setConfirmationDialogOpen(false);
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Editar Refugio</DialogTitle>
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
            <TextField
              fullWidth
              margin="normal"
              label="Latitud"
              name="latitude"
              type="number"
              value={formData.latitude}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Longitud"
              name="longitude"
              type="number"
              value={formData.longitude}
              onChange={handleChange}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Guardar Cambios
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo de confirmación */}
      <Dialog open={confirmationDialogOpen} onClose={handleConfirmationClose}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogMessage}</DialogContentText>
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

export default EditCenter;
