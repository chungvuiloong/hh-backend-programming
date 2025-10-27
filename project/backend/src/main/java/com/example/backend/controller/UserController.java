package com.example.backend.controller;

import org.springframework.web.bind.annotation.*;
import com.example.backend.util.LocationUtil;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    
    @GetMapping("/")
    public String home() {
        System.out.println(LocationUtil.getCountryByIp());
        return (LocationUtil.getCountryByIp() != null) ? LocationUtil.getCountryByIp() : "Unknown Country";
    }

    @GetMapping("/location/country")
    public String getCountry() {
        String country = LocationUtil.getCountryByIp();
        return country != null ? country : "Unknown";
    }

    @GetMapping("/location/city")
    public String getCity() {
        String city = LocationUtil.getCityByIp();
        return city != null ? city : "Unknown";
    }

    @GetMapping("/location/city/weather")
    public String getCityWeather() {
        String city = LocationUtil.getCityByIp();
        return city != null ? LocationUtil.getWeatherByCity(city) : "Unknown";
    }

    @GetMapping("/location/info")
    public Map<String, String> getLocationInfo() {
        Map<String, String> location = new HashMap<>();
        location.put("country", LocationUtil.getCountryByIp());
        location.put("city", LocationUtil.getCityByIp());
        return location;
    }
}