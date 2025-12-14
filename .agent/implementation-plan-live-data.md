# Live Data Integration & Styling Improvements Plan

## Overview
Transform the iTravelsHub homepage from mock data to live web-scraped data and apply consistent dark gradient styling.

## Phase 1: Background Styling (Quick Win)
- [ ] Apply dark gradient background to Home2Destinationslide
- [ ] Apply dark gradient background to Home2ThrillingTour  
- [ ] Apply dark gradient background to Home2Activities
- [ ] Ensure consistent spacing and styling across sections

## Phase 2: Language Verification
- [ ] Check all components for non-English text
- [ ] Update any placeholder text to English
- [ ] Verify all section titles and descriptions

## Phase 3: Live Data Integration (Complex)

### 3.1 Destinations Data
**Component**: Home2Destinationslide
- [ ] Create API route: `/api/destinations/trending`
- [ ] Implement web scraping for popular destinations
- [ ] Sources to consider:
  - TripAdvisor trending destinations
  - Booking.com popular locations
  - Expedia top destinations
- [ ] Cache results (24 hours)
- [ ] Update component to fetch from API

### 3.2 Tour Packages Data
**Component**: Home2ThrillingTour
- [ ] Create API route: `/api/tours/featured`
- [ ] Implement web scraping for tour packages
- [ ] Sources to consider:
  - Viator tours
  - GetYourGuide experiences
  - TripAdvisor tours
- [ ] Include: title, price, rating, duration, location
- [ ] Cache results (12 hours)
- [ ] Update component to fetch from API

### 3.3 Special Offers Data
**Component**: Home2Banner2 or dedicated offers section
- [ ] Create API route: `/api/offers/current`
- [ ] Implement web scraping for deals
- [ ] Sources to consider:
  - Kayak deals
  - Skyscanner offers
  - Booking.com deals
- [ ] Include: discount %, original price, offer price, expiry
- [ ] Cache results (6 hours)
- [ ] Update component to fetch from API

## Phase 4: Implementation Details

### Web Scraping Setup
```javascript
// Use existing tools in project
- Cheerio (already installed)
- Puppeteer (already installed)
- Axios for HTTP requests
```

### API Routes Structure
```
/api/
  /destinations/
    trending.js
  /tours/
    featured.js
  /offers/
    current.js
```

### Caching Strategy
- Use Next.js built-in caching
- Implement Redis or in-memory cache for production
- Set appropriate revalidation times

## Priority Order
1. **High Priority**: Background styling (30 mins)
2. **Medium Priority**: Language verification (15 mins)
3. **Low Priority**: Live data integration (4-6 hours)

## Notes
- Web scraping should respect robots.txt
- Implement rate limiting
- Add error handling and fallback to mock data
- Consider using official APIs where available (better than scraping)
- May need to use proxy services for some sites

## Estimated Time
- Phase 1: 30 minutes
- Phase 2: 15 minutes  
- Phase 3: 4-6 hours (complex, requires testing)
- **Total**: 5-7 hours

## Recommendation
Start with Phases 1 & 2 immediately. Phase 3 (live data) should be a separate project as it requires:
- Careful scraping implementation
- Legal compliance checking
- Robust error handling
- Performance optimization
- Ongoing maintenance
