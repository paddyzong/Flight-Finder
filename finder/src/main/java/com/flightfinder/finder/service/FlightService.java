package com.flightfinder.finder.service;

import org.springframework.stereotype.Service;

@Service
public class FlightService {

    private static final String WORD = "flight";

    public int countFlights(String text) {
        if (text == null || text.length() > 100) return 0;

        int[] freq = new int[26];
        text.chars().forEach(c -> freq[c - 'a']++);

        int min = Integer.MAX_VALUE;
        for (char c : WORD.toCharArray()) {
            min = Math.min(min, freq[c - 'a']);
        }
        return min;
    }
}
