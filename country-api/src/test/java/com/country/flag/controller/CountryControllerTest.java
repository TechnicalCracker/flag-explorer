package com.country.flag.controller;

import com.country.flag.domain.Country;
import com.country.flag.domain.CountryDetails;
import com.country.flag.service.CountryService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@WebMvcTest(CountryController.class)
public class CountryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private CountryService countryService;

    @Test
    @DisplayName("GET /countries must return list of countries")
    void getAllCountries_mustReturnCountryList() throws Exception {

        Country sa = new Country();
        sa.setName("South Africa");
        sa.setFlag("https://flagcdn.com/za.png");

        Country gh = new Country();
        gh.setName("Ghana");
        gh.setFlag("https://flagcdn.com/gh.png");

        when(countryService.fetchCountries()).thenReturn(List.of(sa, gh));


        mockMvc.perform(get("/countries"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].name").value("South Africa"))
                .andExpect(jsonPath("$[1].flag").value("https://flagcdn.com/gh.png"));
    }

    @Test
    @DisplayName("GET /countries/{name} must return country details if found")
    void getCountryByName_mustReturnDetailsIfFound() throws Exception {

        CountryDetails kenya = new CountryDetails();
        kenya.setName("Kenya");
        kenya.setCapital("Nairobi");
        kenya.setPopulation(53771300);
        kenya.setFlag("https://flagcdn.com/ke.png");

        when(countryService.fetchCountryByName("Kenya")).thenReturn(kenya);

        mockMvc.perform(get("/countries/Kenya"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Kenya"))
                .andExpect(jsonPath("$.capital").value("Nairobi"))
                .andExpect(jsonPath("$.population").value(53771300));
    }

    @Test
    @DisplayName("GET /countries/{name} must return 404 if not found")
    void getCountryByName_mustReturn404IfNull() throws Exception {

        when(countryService.fetchCountryByName("Atlantis")).thenReturn(null);

        mockMvc.perform(get("/countries/Atlantis"))
                .andExpect(status().isNotFound());
    }
}
