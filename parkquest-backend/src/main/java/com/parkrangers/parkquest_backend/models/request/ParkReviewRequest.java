package com.parkrangers.parkquest_backend.models.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ParkReviewRequest {

    private String parkId;
    private String reviewText;
    private int rating;

}
