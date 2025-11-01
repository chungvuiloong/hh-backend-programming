package com.example.backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.backend.util.LocationUtil;
import com.example.backend.service.ConvexService;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private ConvexService convexService;
    
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

    @GetMapping("/location/country/code")
    public String getCountryCode() {
        String countryCode = LocationUtil.getCountryCode();
        return countryCode != null ? countryCode : "Unknown";
    }

    @GetMapping("/location/city")
    public String getCity() {
        String city = LocationUtil.getCityByIp();
        return city != null ? city : "Unknown";
    }

    @GetMapping("/location/city/weather")
    public String getCityWeather() {
        String city = LocationUtil.getCityByIp();
        String countryCode = LocationUtil.getCountryCode();
        return city != null ? LocationUtil.getWeatherByCity(city, countryCode) : "Unknown";
    }

    @GetMapping("/location/info")
    public Map<String, String> getLocationInfo() {
        Map<String, String> location = new HashMap<>();
        String country = LocationUtil.getCountryByIp();
        String city = LocationUtil.getCityByIp();

        location.put("country", country);
        location.put("city", city);

        if (country != null && city != null) {
            convexService.addLocation(country, city);
        }

        return location;
    }
}