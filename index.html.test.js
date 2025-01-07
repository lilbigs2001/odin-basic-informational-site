const path = require("path");
const fs = require("fs");
const cheerio = require("cheerio");

it('contains an h1 tag with the content "Homepage"', () => {
  const filePath = path.join(__dirname, "index.html");
  const htmlContent = fs.readFileSync(filePath, "utf-8");
  const $ = cheerio.load(htmlContent);

  const h1Content = $("h1").text();
  expect(h1Content).toBe("Homepage");
});
