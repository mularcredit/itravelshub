import allAirports from 'airport-codes/airports.json';

// const allAirports = airportCodes.toJSON();

// Popular airports for autocomplete - Mapped from airport-codes
export const airports = allAirports
    .filter(a => a.iata && a.iata.length === 3) // Only valid IATA codes
    .map(a => ({
        code: a.iata,
        city: a.city || '',
        name: a.name || '',
        country: a.country || 'Unknown',
        // Preserve other fields if needed, but these are what we use
    }));

// Enhanced search function for autocomplete
export function searchAirports(query) {
    if (!query || query.length < 1) return [];

    const searchTerm = query.toLowerCase().trim();

    // Optimization: If search term is too short, don't search everything?
    // But existing logic did search everything. 8000 items is fast.

    const scoredResults = [];

    // Use a for...of loop for slightly better performance than map over 8000 items if we want to break early? 
    // But we need to sort by score, so we must process all.

    for (const airport of airports) {
        let score = 0;
        const code = airport.code.toLowerCase();
        const city = airport.city.toLowerCase();
        const name = airport.name.toLowerCase();
        const country = airport.country.toLowerCase();

        // Exact code match (highest priority)
        if (code === searchTerm) score += 1000;
        else if (code.startsWith(searchTerm)) score += 500;
        else if (code.includes(searchTerm)) score += 100;

        // City match (high priority)
        if (city === searchTerm) score += 800;
        else if (city.startsWith(searchTerm)) score += 400;
        else if (city.includes(searchTerm)) score += 80;

        // Country match (medium priority)
        if (country === searchTerm) score += 300;
        else if (country.startsWith(searchTerm)) score += 150;
        else if (country.includes(searchTerm)) score += 50;

        // Airport name match (lower priority)
        if (name.includes(searchTerm)) score += 30;

        // Exact city/country match in specific context (optional)

        if (score > 0) {
            // Bonus for shorter names/cities (more relevant usually)
            // But be careful not to penalize South Sudan (longer country name)
            // The original logic had: score += (100 - city.length);
            // This might hurt "South Sudan" vs "Sudan". 
            // Let's keep it but maybe cap it.
            score += Math.max(0, 100 - city.length);

            scoredResults.push({ airport, score });
        }
    }

    return scoredResults
        .sort((a, b) => b.score - a.score)
        .slice(0, 10) // Top 10 results
        .map(result => result.airport);
}
