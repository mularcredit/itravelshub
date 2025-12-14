const puppeteer = require('puppeteer');

/**
 * Get Puppeteer configuration based on environment
 */
function getPuppeteerConfig() {
  const isRender = process.env.NODE_ENV === 'production';
  
  if (isRender) {
    console.log('🚀 Render environment - using system Chrome');
    return {
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
      executablePath: '/usr/bin/google-chrome-stable'
    };
  } else {
    console.log('💻 Local environment - using default Puppeteer');
    return {
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    };
  }
}

/**
 * @typedef {Object} GuestConfig
 * @property {number} adults
 * @property {number} children
 * @property {number} rooms
 */

/**
 * @typedef {Object} Hotel
 * @property {string} name
 * @property {string} price
 * @property {string} rating
 * @property {string} [image]
 * @property {string} [reviews]
 * @property {string} [link]
 * @property {string[]} [vibes]
 * @property {string} [city]
 */

/**
 * Search for hotels using Puppeteer to scrape Booking.com
 * @param {string} location - Destination city or location
 * @param {string} checkIn - Check-in date (yyyy-MM-dd format)
 * @param {string} checkOut - Check-out date (yyyy-MM-dd format)
 * @param {GuestConfig} guests - Guest configuration
 * @param {number} [offset=0] - Pagination offset
 * @returns {Promise<Hotel[]>}
 */
async function searchHotels(location, checkIn, checkOut, guests, offset = 0) {
    let browser;
    try {
        // Use environment-specific config
        const puppeteerConfig = getPuppeteerConfig();
        console.log('Launching browser with config:', puppeteerConfig.args);
        
        browser = await puppeteer.launch(puppeteerConfig);

        const page = await browser.newPage();
        
        // Set realistic user agent and headers
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
        
        // Add stealth headers
        await page.setExtraHTTPHeaders({
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Upgrade-Insecure-Requests': '1'
        });

        const url = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(location)}&checkin=${checkIn}&checkout=${checkOut}&group_adults=${guests.adults}&group_children=${guests.children}&no_rooms=${guests.rooms}&selected_currency=USD&lang=en-us&offset=${offset}`;

        console.log(`Navigating to: ${url}`);
        
        // Go to page with longer timeout for Render
        await page.goto(url, { 
            waitUntil: 'domcontentloaded', 
            timeout: process.env.NODE_ENV === 'production' ? 90000 : 60000 
        });

        // Check if we're on the right page
        const currentUrl = await page.url();
        console.log('Current URL after navigation:', currentUrl);
        
        // Wait for content with multiple selector options
        const selectors = [
            '[data-testid="property-card"]',
            '.sr_property_block',
            '.sr-item'
        ];
        
        let cardsFound = false;
        for (const selector of selectors) {
            try {
                await page.waitForSelector(selector, { timeout: 10000 });
                cardsFound = true;
                console.log(`Found elements with selector: ${selector}`);
                break;
            } catch (e) {
                // Continue to next selector
            }
        }
        
        if (!cardsFound) {
            console.log('No hotel cards found with any selector');
            return [];
        }

        const hotels = await page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('[data-testid="property-card"]'));
            return cards.map(card => {
                const titleElement = card.querySelector('[data-testid="title"]');
                const priceElement = card.querySelector('[data-testid="price-and-discounted-price"]');
                const ratingElement = card.querySelector('[data-testid="review-score"]');
                const imageElement = card.querySelector('[data-testid="image"]');
                const linkElement = card.querySelector('a[data-testid="title-link"]') || card.querySelector('a');
                const addressElement = card.querySelector('[data-testid="address"]');

                let rating = 'N/A';
                if (ratingElement) {
                    rating = ratingElement.textContent?.trim() || 'N/A';
                    const match = rating.match(/\d+(\.\d+)?/);
                    if (match) rating = match[0];
                }

                let imageUrl = imageElement?.getAttribute('src');
                if (!imageUrl) {
                    // Try finding in srcset
                    const srcset = imageElement?.getAttribute('srcset');
                    if (srcset) {
                        const sources = srcset.split(',').map(s => s.trim().split(' '));
                        // Get largest image
                        if (sources.length > 0) imageUrl = sources[sources.length - 1][0];
                    }
                }

                if (imageUrl) {
                    // Try to get a larger version if it's a small one
                    imageUrl = imageUrl.replace(/max\d+/, 'max1024x768');
                    imageUrl = imageUrl.replace(/square\d+/, 'max1024x768');
                }

                // AI Vibe Heuristics
                const vibes = [];
                const nameLower = (titleElement?.textContent || '').toLowerCase();

                if (nameLower.includes('resort') || nameLower.includes('spa') || nameLower.includes('beach')) vibes.push('Relaxation');
                if (nameLower.includes('hostel') || nameLower.includes('backpackers')) vibes.push('Social');
                if (nameLower.includes('business') || nameLower.includes('suite') || nameLower.includes('airport')) vibes.push('Work');
                if (nameLower.includes('boutique') || nameLower.includes('villa') || nameLower.includes('design')) vibes.push('Romantic');
                if (nameLower.includes('apartment') || nameLower.includes('home')) vibes.push('Family');

                // Fallback vibe if none found
                if (vibes.length === 0) vibes.push('Hidden Gem');

                return {
                    name: titleElement?.textContent?.trim() || 'Unknown Hotel',
                    price: priceElement?.textContent?.trim() || 'Contact for Price',
                    rating: rating,
                    image: imageUrl || undefined,
                    reviews: 'Verified Reviews',
                    link: linkElement?.getAttribute('href') || undefined,
                    vibes: vibes,
                    city: addressElement?.textContent?.trim() || undefined
                };
            });
        });

        console.log(`Found ${hotels.length} hotels.`);
        return hotels;

    } catch (error) {
        console.error('Scraping failed:', error.message);
        return [];
    } finally {
        if (browser) await browser.close();
    }
}

/**
 * @typedef {Object} HotelDetails
 * @property {string} description
 * @property {string[]} amenities
 * @property {string[]} images
 * @property {string[]} [rooms]
 * @property {Object} [houseRules]
 * @property {string} [houseRules.checkIn]
 * @property {string} [houseRules.checkOut]
 * @property {Object} [truthLens]
 * @property {string[]} truthLens.pros
 * @property {string[]} truthLens.cons
 */

/**
 * Scrape detailed hotel information
 * @param {string} url - Hotel detail page URL
 * @returns {Promise<HotelDetails|null>}
 */
async function scrapeHotelDetails(url) {
    let browser;
    try {
        const puppeteerConfig = getPuppeteerConfig();
        browser = await puppeteer.launch(puppeteerConfig);

        const page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 });
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

        console.log(`Details scraping for: ${url}`);
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });

        // Extract Description
        const description = await page.evaluate(() => {
            const selectors = [
                '[data-testid="property-section-description-content"]',
                '#property_description_content',
                '.hotel_description_wrapper_exp',
                '.hp_desc_main_content'
            ];

            for (const sel of selectors) {
                const el = document.querySelector(sel);
                if (el && el.textContent && el.textContent.length > 50) return el.textContent.trim();
            }

            const paragraphs = document.querySelectorAll('p');
            for (const p of Array.from(paragraphs)) {
                if (p.textContent && p.textContent.length > 100) return p.textContent.trim();
            }

            return '';
        });

        // Extract Amenities
        const amenities = await page.evaluate(() => {
            let items = [];

            const popular = document.querySelectorAll('[data-testid="property-most-popular-facilities-wrapper"] li, .bui-list__item, .hotel-facilities__list li');
            items = Array.from(popular).map(el => el.textContent?.trim() || '').filter(t => t.length > 2);

            if (items.length < 3) {
                const facilitiesText = document.querySelector('.facilitiesChecklist')?.textContent;
                if (facilitiesText) {
                    items = facilitiesText.split('\n').map(s => s.trim()).filter(s => s.length > 3 && s.length < 30);
                }
            }

            return items.slice(0, 12);
        });

        // Extract Room Types
        const rooms = await page.evaluate(() => {
            const roomRows = document.querySelectorAll('#hprt-table tbody tr, [data-testid="room-table"] tr');
            const roomNames = new Set();

            roomRows.forEach(row => {
                const nameEl = row.querySelector('.hprt-roomtype-link, [data-testid="room-name"]');
                if (nameEl && nameEl.textContent) {
                    const name = nameEl.textContent.trim().split('\n')[0];
                    if (name.length > 3) roomNames.add(name);
                }
            });

            return Array.from(roomNames).slice(0, 5);
        });

        // Extract House Rules
        const houseRules = await page.evaluate(() => {
            const checkIn = document.querySelector('#checkin_policy, [data-testid="checkin-policy"]')?.textContent?.replace('Check-in', '').trim();
            const checkOut = document.querySelector('#checkout_policy, [data-testid="checkout-policy"]')?.textContent?.replace('Check-out', '').trim();
            return { checkIn, checkOut };
        });

        // Extract Images
        const images = await page.evaluate(() => {
            const uniqueImages = new Set();
            const validImages = [];
            const imgs = document.querySelectorAll('.bh-photo-grid-item img, .gallery-side-reviews-wrapper img, [data-testid="gallery-image"], #hotel_main_content img');

            Array.from(imgs).forEach((img) => {
                const src = img.src;
                if (src && !src.includes('pixel') && !uniqueImages.has(src)) {
                    const highRes = src.replace(/\/max\d+\//, '/max1280x900/');
                    if (!uniqueImages.has(highRes)) {
                        uniqueImages.add(highRes);
                        validImages.push(highRes);
                    }
                }
            });
            return validImages.slice(0, 8);
        });

        // Truth Lens Logic
        const truthLens = {
            pros: [],
            cons: []
        };

        const lowerDesc = description.toLowerCase();
        const lowerName = (await page.title()).toLowerCase();

        // Pros analysis
        if (amenities.some(a => a.toLowerCase().includes('pool')) || lowerDesc.includes('pool')) truthLens.pros.push('Aquatic Center Verified');
        if (amenities.some(a => a.toLowerCase().includes('wifi')) && !lowerDesc.includes('paid wifi')) truthLens.pros.push('Remote Work Ready');
        if (lowerDesc.includes('heart of') || lowerDesc.includes('center') || lowerDesc.includes('walking distance')) truthLens.pros.push('Prime Location');
        if (amenities.some(a => a.includes('Breakfast'))) truthLens.pros.push('Breakfast Included');

        // Cons analysis
        if (lowerDesc.includes('lively area') || lowerDesc.includes('nightlife') || lowerDesc.includes('bar')) truthLens.cons.push('Potential Noise Risk');
        if (!amenities.some(a => a.toLowerCase().includes('elevator')) && !amenities.some(a => a.toLowerCase().includes('lift')) && lowerDesc.includes('floor')) truthLens.cons.push('Stairs Only Warning');
        if (lowerDesc.includes('compact') || lowerDesc.includes('cosy') || lowerDesc.includes('small room')) truthLens.cons.push('Small Room Size');
        if (lowerDesc.includes('shared bathroom')) truthLens.cons.push('Shared Bathroom');

        if (truthLens.pros.length === 0) truthLens.pros.push('Standard Amenities');
        if (truthLens.cons.length === 0) truthLens.cons.push('No Red Flags Detected');

        return { description, amenities, images, rooms, houseRules, truthLens };

    } catch (error) {
        console.error("Error scraping hotel details:", error);
        return null;
    } finally {
        if (browser) await browser.close();
    }
}

module.exports = { searchHotels, scrapeHotelDetails };