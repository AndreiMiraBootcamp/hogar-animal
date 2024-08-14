package es.animal.hogar.model;

public class PetImage {

    private Long petImageId;
    private Long petId;
    private byte[] image;
    
    
	public Long getPetImageId() {
		return petImageId;
	}
	public void setPetImageId(Long petImageId) {
		this.petImageId = petImageId;
	}
	public Long getPetId() {
		return petId;
	}
	public void setPetId(Long petId) {
		this.petId = petId;
	}
	public byte[] getImage() {
		return image;
	}
	public void setImage(byte[] image) {
		this.image = image;
	}
}
