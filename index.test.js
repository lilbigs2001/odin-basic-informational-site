const request = require("supertest");
const http = require("http");
const server = require("./index");
const path = require("path");
const fs = require("fs");

let testServer;

beforeAll(() => {
  testServer = server.listen(0);
});

afterAll((done) => {
  testServer.close(done);
});

it("serves the content of index.html with status 200 when navigating to the root route (/)", async () => {
  const indexHtmlPath = path.join(__dirname, "index.html");
  const expectedContent = fs.readFileSync(indexHtmlPath, "utf-8");

  const response = await request(testServer).get("/");

  expect(response.status).toBe(200);
  expect(response.text).toBe(expectedContent);
});

it("responds with status 500 when index.html can't be read", async () => {
  jest.spyOn(fs, "readFile").mockImplementation((path, callback) => {
    callback(new Error("File not found"), null);
  });

  const response = await request(testServer).get("/");
  expect(response.status).toBe(500);
  expect(response.text).toBe("Internal Server Error");

  fs.readFile.mockRestore();
});

it("serves the content of about.html with status 200 when navigating to '/about'", async () => {
  const filePath = path.join(__dirname, "about.html");
  const expectedContent = fs.readFileSync(filePath, "utf-8");

  const response = await request(testServer).get("/about");
  expect(response.status).toBe(200);
  expect(response.text).toBe(expectedContent);
});

it("responds with status 500 when about.html can't be read", async () => {
  jest.spyOn(fs, "readFile").mockImplementation((path, callback) => {
    callback(new Error("File not found"), null);
  });

  const response = await request(testServer).get("/about");
  expect(response.status).toBe(500);
  expect(response.text).toBe("Internal Server Error");

  fs.readFile.mockRestore();
});

/*
  -
*/
