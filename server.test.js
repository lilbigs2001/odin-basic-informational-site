const request = require("supertest");
const http = require("http");
const { server, SERVER_ERROR_MESSAGE } = require("./server");
const path = require("path");
const fs = require("fs");

let testServer;

beforeAll(() => {
  testServer = server.listen(0);
});

afterAll((done) => {
  testServer.close(done);
});

const testCasesSuccess = [
  { url: "/", page: "index.html" },
  { url: "/about", page: "about.html" },
  { url: "/contact-me", page: "contact-me.html" },
  { url: "/this-is-fake", page: "404.html" },
];

const testError = new Error("File not found");

const testCasesFailure = [
  { url: "/", page: "index.html" },
  { url: "/about", page: "about.html" },
  { url: "/contact-me", page: "contact-me.html" },
  { url: "/this-is-fake", page: "404.html" },
];

it.each(testCasesSuccess)(
  "serves the content of $page with correct status when navigating to $url",
  async ({ url, page }) => {
    const filePath = path.join(__dirname, page);
    const expectedContent = fs.readFileSync(filePath, "utf-8");

    const response = await request(testServer).get(url);
    expect(response.status).toBe(url !== "/this-is-fake" ? 200 : 404);
    expect(response.text).toBe(expectedContent);
  },
);

it.each(testCasesFailure)(
  "responds with status 500 when $page can't be read",
  async ({ url }) => {
    jest.spyOn(fs, "readFile").mockImplementation((path, callback) => {
      callback(testError, null);
    });

    const response = await request(testServer).get(url);
    expect(response.status).toBe(500);
    expect(response.text).toBe(SERVER_ERROR_MESSAGE);

    fs.readFile.mockRestore();
  },
);
