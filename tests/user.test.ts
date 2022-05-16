import request from 'supertest';
import app from '../src/app';


describe("GET /user", () => {
    describe("when passed",  () => {
         test("should respond with a 200 status code", async (done) => {
            const response = await request(app).get("/user")
            await expect(response.statusCode).toBe(200);
        });
    });
});