import request from 'supertest';
import app from '../src/app';
import user from "../src/frameworks/database/postgres/models/user";

let userId : string;

describe("GET /user", () => {
    describe("when passed",  () => {
         test("should respond with a 200 status code", async () => {
             const response = await request(app).get("/user")
             expect(response.statusCode).toBe(200);
        });
    });
});

describe("POST /user/:id", () => {
    describe("when passed",  () => {
        test("should respond with a 200 status code", async () => {
            const response = await request(app).post("/user").send({
                first_name: 'Tom',
                last_name: 'Hardy',
                date_of_birth : '2001-10-12',
                timezone: 'Asia/Jakarta',
                address : 'South Jakarta'
            })
            userId = response.res.text.user

            await expect(response.statusCode).toBe(200);
        });
    });
});

describe("PUT /user/:id", () => {
    describe("when passed",  () => {
        test("should respond with a 200 status code", async () => {
            const response = await request(app).put(`/user/${userId}`).send({
                first_name: 'Matt',
                last_name: 'Staufer',
                date_of_birth : '2002-11-13',
                timezone: 'Asia/Manila',
                address : 'Manila'
            })
            expect(response.statusCode).toBe(200);
        });
    });
});
