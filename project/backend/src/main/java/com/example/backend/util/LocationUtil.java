package com.example.backend.util;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.HttpURLConnection;
import org.json.JSONObject;

public class LocationUtil {

    private static final String IP_API_URL = "http://ip-api.com/json/";

    /**
     * Gets the current country based on the machine's public IP address.
     * Uses the ip-api.com free API service.
     *
     * @return The country name as a String, or null on failure.
     */
    public static String getCountryByIp() {
        try {

            URL url = new URL(IP_API_URL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");

            BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            StringBuilder response = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                response.append(line);
            }
            reader.close();

            JSONObject json = new JSONObject(response.toString());

            if (json.getString("status").equals("success")) {
                return json.getString("country");
            }

        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Could not retrieve country via IP API.");
        }
        return null;
    }

    /**
     * Gets the city based on IP address.
     *
     * @return The city name as a String, or null on failure.
     */
    public static String getCityByIp() {
        try {
            URL url = new URL(IP_API_URL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");

            BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            StringBuilder response = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                response.append(line);
            }
            reader.close();

            JSONObject json = new JSONObject(response.toString());

            if (json.getString("status").equals("success")) {
                return json.getString("city");
            }

        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Could not retrieve city via IP API.");
        }
        return null;
    }
}
