package com.parkrangers.parkquest_backend.controller;

import com.parkrangers.parkquest_backend.models.response.Park;
import com.parkrangers.parkquest_backend.service.ParkSearchService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ParkSearchController {

    private ParkSearchService parkSearchService;

    @GetMapping("/parks/searches")
    public List<Park> getParks(@RequestParam String stateCode, @RequestParam String parkCode) {
        return parkSearchService.getParks(stateCode, parkCode);
    }
}

