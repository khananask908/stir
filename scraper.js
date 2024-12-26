const puppeteer = require("puppeteer");

async function scrapeTwitterTrends() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Navigate to Twitter and log in (using your credentials)
  await page.goto("https://twitter.com/login");
  await page.waitForSelector('input[name="session[username_or_email]"]');

  // Login (replace with your credentials)
  await page.type(
    'input[name="session[username_or_email]"]',
    "your_twitter_username"
  );
  await page.type('input[name="session[password]"]', "your_twitter_password");
  await page.click('div[role="button"]');
  await page.waitForNavigation();

  // Navigate to the "What's Happening" section
  await page.goto("https://twitter.com/explore/tabs/trending");
  await page.waitForSelector("div.css-1dbjc4n.r-1jgb49m"); // Wait for trends to load

  // Scrape the top 5 trending topics
  const trends = await page.evaluate(() => {
    const trendElements = Array.from(
      document.querySelectorAll("div.css-1dbjc4n.r-1jgb49m")
    );
    return trendElements.slice(0, 5).map((trend) => trend.innerText);
  });

  await browser.close();
  return trends;
}

module.exports = scrapeTwitterTrends;
