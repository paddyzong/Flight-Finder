package com.flightfinder.finder.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
public record FlightRequest(
        @NotBlank(message = "text must not be empty")
        @Size(max = 100, message = "text must be ≤ 100 characters")
        @Pattern(regexp = "^[a-z]+$", message = "only lower‑case a–z allowed")
        String text) { }
