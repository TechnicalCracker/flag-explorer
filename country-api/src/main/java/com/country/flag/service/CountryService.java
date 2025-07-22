package com.country.flag.service;

import com.country.flag.domain.Country;
import com.country.flag.domain.CountryDetails;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class CountryService {

    @Value("${countries.url}")
    private String apiUrl;

    private ObjectMapper objectMapper;

    private final RestTemplate restTemplate;


    public CountryService(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
        this.restTemplate = restTemplate;
    }

    public List<Country> fetchCountries() {
        String url = apiUrl + "/all?fields=name,flags";
        List<Country> countries = new ArrayList<>();

        try {
            JsonNode response = restTemplate.getForObject(url, JsonNode.class);
            if (response != null && response.isArray()) {
                for (JsonNode node : response) {
                    JsonNode nameNode = node.path("name").path("common");
                    JsonNode flagNode = node.path("flags").path("png");

                    if (!nameNode.isMissingNode() && !flagNode.isMissingNode()) {
                        Country country = new Country();
                        country.setName(nameNode.asText());
                        country.setFlag(flagNode.asText());
                        countries.add(country);
                    }
                }
            }
        } catch (Exception e) {
            // Log the error or handle it gracefully (intentionally left minimal)
            System.err.println("Failed to fetch countries: " + e.getMessage());
        }

        return countries;
    }

    public CountryDetails fetchCountryByName(String name) {
        String url = apiUrl + "/name/" + name;

        try {
            JsonNode response = restTemplate.getForObject(url, JsonNode.class);
            if (response != null && response.isArray() && !response.isEmpty()) {
                JsonNode countryNode = response.get(0);

                CountryDetails country = new CountryDetails();
                country.setName(countryNode.path("name").path("common").asText());
                country.setPopulation(countryNode.path("population").asInt(0));
                country.setFlag(countryNode.path("flags").path("png").asText(""));

                JsonNode capitalNode = countryNode.path("capital");
                country.setCapital(capitalNode.isArray() && !capitalNode.isEmpty()
                        ? capitalNode.get(0).asText()
                        : "N/A");

                return country;
            }
        } catch (Exception e) {
            System.err.println("Error fetching country by name: " + e.getMessage());
        }

        return null;
    }
}
