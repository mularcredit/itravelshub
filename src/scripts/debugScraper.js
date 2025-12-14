const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { executablePath } = require('puppeteer');

puppeteer.use(StealthPlugin());

async function runDebug() {
    console.log("🕵️‍♂️ Starting Debug Scraper...");

    // Launch browser
    const browser = await puppeteer.launch({
        headless: true,
        executablePath: executablePath(),
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--window-size=1366,768'
        ]
    });

    try {
        const page = await browser.newPage();
        await page.setViewport({ width: 1366, height: 768 });

        // Randomize User Agent
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

        const origin = 'JFK';
        const destination = 'LHR';
        const date = '251225'; // YYMMDD

        const url = `https://www.skyscanner.net/transport/flights/${origin}/${destination}/${date}/`;

        console.log(`📡 Navigating to: ${url}`);

        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
        console.log("✅ Page loaded. Waiting for network idle...");

        // Wait a bit
        await new Promise(r => setTimeout(r, 5000));

        // Take Screenshot 1: Success/Block?
        await page.screenshot({ path: 'scraper_debug_1_initial.png', fullPage: true });
        console.log("📸 Screenshot 1 saved.");

        // Check content
        const content = await page.content();
        const fs = require('fs');
        fs.writeFileSync('scraper_debug_content.html', content);
        console.log("📝 Saved HTML content to scraper_debug_content.html");

        if (content.includes('Robot') || content.includes('captcha') || content.includes('Challenge')) {
            console.error("❌ Detected Bot Block/Captcha!");
        } else {
            console.log("✅ No obvious bot block text detected.");
        }

        // Try to wait for results
        try {
            console.log("⏳ Waiting for flight cards...");
            await page.waitForSelector('a[data-testid="flight-card-link"], .EcoTicketWrapper_itineraryContainer__', { timeout: 10000 });
            console.log("✅ Flight cards found!");
            await page.screenshot({ path: 'scraper_debug_2_success.png', fullPage: true });
        } catch (e) {
            console.error("❌ Timeout waiting for flight cards.");
            await page.screenshot({ path: 'scraper_debug_2_failed.png', fullPage: true });
        }

    } catch (error) {
        console.error("❌ Critical Error:", error);
    } finally {
        await browser.close();
    }
}

runDebug();
