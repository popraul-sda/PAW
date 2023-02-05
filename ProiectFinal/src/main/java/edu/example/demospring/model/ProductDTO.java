package edu.example.demospring.model;

public class ProductDTO {

    private Long id;
    private String name;
    private String price;

    private String final_date;

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public ProductDTO(byte[] image) {
        this.image = image;
    }

    private byte []image;
public ProductDTO()
{

}

    public ProductDTO(long id, String name, String price, String final_date) {
        this.id = id;
        this.name = name;
        this.price=price;
        this.final_date=final_date;
    }

    public String getFinal_date() {
        return final_date;
    }

    public void setFinal_date(String final_date) {
        this.final_date = final_date;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }
}
