const path = require("path");
const fs = require("fs");
const cheerio = require("cheerio");

it("contains h1 with the text content 'Contact Me'", () => {
  const filePath = path.join(__dirname, "contact-me.html");
  const htmlContent = fs.readFileSync(filePath, "utf-8");
  const $ = cheerio.load(htmlContent);

  const h1Content = $("h1").text();
  expect(h1Content).toBe("Contact Me");
});
