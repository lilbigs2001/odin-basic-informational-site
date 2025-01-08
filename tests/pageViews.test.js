const path = require("path");
const fs = require("fs");
const cheerio = require("cheerio");

it.each([
  { headerText: "Homepage", file: "index.html" },
  { headerText: "About", file: "about.html" },
  { headerText: "Contact Me", file: "contact-me.html" },
  { headerText: "404—Page not found", file: "404.html" },
])("contains an h1 tag with the content '$text'", ({ headerText, file }) => {
  const filePath = path.join(__dirname, "../public", file);
  const htmlContent = fs.readFileSync(filePath, "utf-8");
  const $ = cheerio.load(htmlContent);

  const h1Content = $("h1").text();
  expect(h1Content).toBe(headerText);
});
