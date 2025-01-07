const request = require("supertest");
const http = require("http");
const server = require("./index");

describe("Server tests", () => {
  let testServer;

  beforeAll(() => {
    testServer = server.listen(8080);
  });

  afterAll(() => {
    testServer.close();
  });

  it("responds with status 200 for GET /", async () => {
    const response = await request(testServer).get("/");
    expect(response.status).toBe(200);
  });
});
