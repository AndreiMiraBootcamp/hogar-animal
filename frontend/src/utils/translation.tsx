export const translateSpecies = (species: string): string => {
	switch (species.toLowerCase()) {
		case "dog":
			return "Perro";
		case "cat":
			return "Gato";
		case "other":
			return "Otro";
		default:
			return species; // Retorna la especie original si no hay traducción disponible
	}
};
export const translateGender = (gender: string): string => {
	switch (gender.toLowerCase()) {
		case "male":
			return "Macho";
		case "female":
			return "Hembra";
		default:
			return gender; // Retorna el género original si no hay traducción disponible
	}
};
