import request from 'supertest';
import app from '../src/app';
import redis from '../src/helpers/redis'

let response;
let header;
const query = {
    query: `query{
      login(email: "arthur", password: "112233"){
        token
        name
      }
    }`
};

beforeAll(async () => {
    response = await request('localhost:8000').post("/graphql").send(query);
    header = {'Authorization' : 'Bearer '+JSON.parse(response.res.text).data.login.token };
});

describe("GET /city", () => {
    describe("when passed a city_id", () => {
        test("should respond with a 200 status code", async () => {
            const response = await request(app).get("/city?city_id=1").set(header);
            expect(response.statusCode).toBe(200);
        });
    });
    describe("when not passed a city_id", () => {
        test("should respond with a 200 status code", async () => {
            const response = await request(app).get("/city").set(header);
            expect(response.statusCode).toBe(200);
        });
    });
});

describe("GET /province", () => {
    describe("when passed a province_id", () => {
        test("should respond with a 200 status code", async () => {
            const response = await request(app).get("/province?province_id=1").set(header);
            expect(response.statusCode).toBe(200);
        });
    });
    describe("when not passed a province_id", () => {
        test("should respond with a 200 status code", async () => {
            const response = await request(app).get("/province").set(header);
            expect(response.statusCode).toBe(200);
        });
    });
});

afterAll(() => redis.disconnect())
