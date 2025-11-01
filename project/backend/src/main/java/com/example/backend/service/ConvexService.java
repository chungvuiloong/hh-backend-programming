package com.example.backend.service;

import okhttp3.*;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import io.github.cdimascio.dotenv.Dotenv;

import java.io.IOException;

@Service
public class ConvexService {
    private final OkHttpClient client = new OkHttpClient();
    private final String convexUrl;
    private static final MediaType JSON = MediaType.get("application/json; charset=utf-8");

    public ConvexService() {
        Dotenv dotenv = null;

        try {
            dotenv = Dotenv.configure()
                .directory("./backend")
                .ignoreIfMissing()
                .load();
        } catch (Exception e) {
            System.out.println("Could not load .env from ./backend");
        }
        
        if (dotenv == null || dotenv.get("CONVEX_URL") == null) {
            try {
                dotenv = Dotenv.configure()
                    .directory(".")
                    .ignoreIfMissing()
                    .load();
            } catch (Exception e) {
                System.out.println("Could not load .env from current directory");
            }
        }

        this.convexUrl = (dotenv != null) ? dotenv.get("CONVEX_URL") : null;

        if (this.convexUrl == null || this.convexUrl.isEmpty()) {
            System.err.println("WARNING: CONVEX_URL not set in environment variables");
            System.err.println("Make sure .env file exists in backend/ directory");
        } else {
            System.out.println("Convex URL loaded: " + this.convexUrl);
        }
    }

    /**
     * Sends location data to Convex
     *
     * @param country The country name
     * @param city The city name
     * @return The location ID from Convex, or null on failure
     */
    public String addLocation(String country, String city) {
        if (convexUrl == null || convexUrl.isEmpty()) {
            System.err.println("Cannot add location: CONVEX_URL not configured");
            return null;
        }

        try {
            JSONObject args = new JSONObject();
            args.put("country", country);
            args.put("city", city);

            JSONObject payload = new JSONObject();
            payload.put("path", "locations:addLocation");
            payload.put("args", args);

            RequestBody body = RequestBody.create(payload.toString(), JSON);

            Request request = new Request.Builder()
                .url(convexUrl)
                .post(body)
                .build();

            try (Response response = client.newCall(request).execute()) {
                if (response.isSuccessful() && response.body() != null) {
                    String responseBody = response.body().string();
                    JSONObject jsonResponse = new JSONObject(responseBody);

                    if (jsonResponse.has("value")) {
                        String locationId = jsonResponse.getString("value");
                        System.out.println("Location saved to Convex with ID: " + locationId);
                        return locationId;
                    }
                } else {
                    System.err.println("Failed to save location to Convex. Status: " + response.code());
                    if (response.body() != null) {
                        System.err.println("Response: " + response.body().string());
                    }
                }
            }
        } catch (IOException e) {
            System.err.println("Error saving location to Convex: " + e.getMessage());
            e.printStackTrace();
        } catch (Exception e) {
            System.err.println("Unexpected error: " + e.getMessage());
            e.printStackTrace();
        }

        return null;
    }
}
