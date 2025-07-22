package com.country.flag.service;

import com.country.flag.domain.Country;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.client.RestTemplate;

import java.lang.reflect.Field;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class CountryServiceTest {

    @Mock
    private RestTemplate restTemplate;

    private ObjectMapper objectMapper;

    private CountryService countryService;

    @BeforeEach
    void setUp() {
        restTemplate = mock(RestTemplate.class);
        objectMapper = new ObjectMapper();
        countryService = new CountryService(restTemplate, objectMapper);

        try {
            Field field = CountryService.class.getDeclaredField("apiUrl");
            field.setAccessible(true);
            field.set(countryService, "https://restcountries.com/v3.1");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    void fetchCountries_mustReturnListOfCountries() throws JsonProcessingException {
        String mockJson = """
            [
              {
                "name": { "common": "South Africa" },
                "flags": { "png": "https://flagcdn.com/za.png" }
              },
              {
                "name": { "common": "Nigeria" },
                "flags": { "png": "https://flagcdn.com/ng.png" }
              }
            ]
        """;

        JsonNode mockResponse = objectMapper.readTree(mockJson);
        when(restTemplate.getForObject("https://restcountries.com/v3.1/all?fields=name,flags", JsonNode.class))
                .thenReturn(mockResponse);

        // When
        List<Country> countries = countryService.fetchCountries();

        // Then
        assertNotNull(countries);
        assertEquals(2, countries.size());

        assertEquals("South Africa", countries.get(0).getName());
        assertEquals("https://flagcdn.com/za.png", countries.get(0).getFlag());
    }

    @Test
    void fetchCountryByName_mustReturnCountryDetails() {
        // TODO: Add mocked RestTemplate response and assertions
    }
}
