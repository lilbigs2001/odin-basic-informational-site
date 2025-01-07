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

it("responds with status 200 for GET /", async () => {
  const response = await request(testServer).get("/");
  expect(response.status).toBe(200);
});

it("returns index.html when navigating to localhost:8080", async () => {
  const indexHtmlPath = path.join(__dirname, "index.html");
  const expectedContent = fs.readFileSync(indexHtmlPath, "utf-8");

  const response = await request(testServer).get("/");

  expect(response.text).toBe(expectedContent);
});

it("responds with 500 if index.html can't be read", async () => {
  jest.spyOn(fs, "readFile").mockImplementation((path, callback) => {
    callback(new Error("File not found"), null);
  });

  const response = await request(testServer).get("/");
  expect(response.status).toBe(500);
  expect(response.text).toBe("Internal Server Error");

  fs.readFile.mockRestore();
});

/*
  - 
*/
