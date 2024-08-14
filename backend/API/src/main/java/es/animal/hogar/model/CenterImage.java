package es.animal.hogar.model;

public class CenterImage {

    private Long centerImageId;
    private Long centerId;
    private byte[] image;
    
    
	public Long getCenterImageId() {
		return centerImageId;
	}
	public void setCenterImageId(Long centerImageId) {
		this.centerImageId = centerImageId;
	}
	public Long getCenterId() {
		return centerId;
	}
	public void setCenterId(Long centerId) {
		this.centerId = centerId;
	}
	public byte[] getImage() {
		return image;
	}
	public void setImage(byte[] image) {
		this.image = image;
	}
}