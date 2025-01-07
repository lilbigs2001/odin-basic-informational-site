const path = require("path");
const fs = require("fs");
const cheerio = require("cheerio");

it("contains an h1 tag with the content 'About'", () => {
  const filePath = path.join(__dirname, "about.html");
  const htmlContent = fs.readFileSync(filePath, "utf-8");
  const $ = cheerio.load(htmlContent);

  const h1Content = $("h1").text();
  expect(h1Content).toBe("About");
});
