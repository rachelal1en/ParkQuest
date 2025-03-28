//package com.parkrangers.parkquest_backend.controller;
//
//import com.parkrangers.parkquest_backend.dto.ImageDTO;
//import com.parkrangers.parkquest_backend.service.ParkService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/images")
//public class ImageController {
//
//    @Autowired
//    private ParkService parkService;
//
//    @GetMapping("/{parkCode}")
//    public List<ImageDTO> getParkImages(@PathVariable String parkCode) {
//        return parkService.getParkImages(parkCode);
//    }
//}