package com.parkrangers.parkquest_backend.dto;

public class ImageDTO {

    private String url;
    private String altText;
    private String title;

    public ImageDTO() {
    }

    public ImageDTO(String url, String altText, String title) {
        this.url = url;
        this.altText = altText;
        this.title = title;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getAltText() {
        return altText;
    }

    public void setAltText(String altText) {
        this.altText = altText;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Override
    public String toString() {
        return "Image{" +
                "url='" + url + '\'' +
                ", altText='" + altText + '\'' +
                ", title='" + title + '\'' +
                '}';
    }
}