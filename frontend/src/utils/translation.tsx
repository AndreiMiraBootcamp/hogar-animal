export const translateSpecies = (species: string): string => {
	switch (species.toLowerCase()) {
		case "dog":
			return "Perro";
		case "cat":
			return "Gato";
		case "other":
			return "Otro";
		default:
			return species;
	}
};
export const translateGender = (gender: string): string => {
	switch (gender.toLowerCase()) {
		case "male":
			return "Macho";
		case "female":
			return "Hembra";
		default:
			return gender;
	}
};
