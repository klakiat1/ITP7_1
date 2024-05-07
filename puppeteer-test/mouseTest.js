const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000'); // Change this URL to your application's URL

    // Simulate a simple mouse movement to a specific position
    await page.mouse.move(100, 100);
    await page.mouse.down();
    await page.mouse.move(200, 200);
    await page.mouse.up();

    // Simulate more complex or random mouse movements
    for (let i = 0; i < 100; i++) {
        await page.mouse.move(Math.random() * 800, Math.random() * 600);
    }

    await browser.close();
})();
