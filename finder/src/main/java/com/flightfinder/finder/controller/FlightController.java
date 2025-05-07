package com.flightfinder.finder.controller;

import com.flightfinder.finder.model.FlightRequest;
import com.flightfinder.finder.model.FlightResponse;
import com.flightfinder.finder.service.FlightService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class FlightController {

    private final FlightService service;

    public FlightController(FlightService service) {
        this.service = service;
    }

    @PostMapping("/flight")
    public ResponseEntity<FlightResponse> count(@Valid @RequestBody FlightRequest req) {
        int result = service.countFlights(req.text());
        return ResponseEntity.ok(new FlightResponse(result));
    }
}
