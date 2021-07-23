const puppeteer = require("puppeteer-core");

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const tweetUrl = process.argv[2];

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: chromePath,
  });
  const page = await browser.newPage();
  await page.goto(
    `https://publish.twitter.com/?query=${tweetUrl}&widget=Tweet`,
    { waitUntil: "networkidle0" }
  );

  await page.waitForSelector(".twitter-tweet");
  const tweet = await page.$(".twitter-tweet");
  await tweet.screenshot({ path: "tweet.png" });
  await browser.close();
})();
