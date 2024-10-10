const request = require("supertest");
const { app,server } = require("../index");

const randomNumber = Math.floor(Math.random() * (100000 - 500 + 1)) + 500;
const email = `darshit${randomNumber}@example.com`;

describe("User API Integration Test", () => {
    afterAll((done) => {
        server.close(done);
    });
    describe("POST /v1/user", () => {
        it("should return 201 when the user is created successfully", async () => {
            const userData = {
                first_name: "darshit",
                last_name: "sharma",
                email: email,
                password: "12345",
            };

            const response = await request(app).post("/v1/user").send(userData);

            expect(response.status).toBe(201);
        });

        it("should return 400 when the request data is invalid", async () => {
            const invalidUserData = {
                name: "",
            };

            const response = await request(app)
                .post("/v1/user")
                .send(invalidUserData);

            expect(response.status).toBe(400);
        });

        it("should return 405 when the request method is not supported", async () => {
            const response = await request(app).put("/v1/user").send();

            expect(response.status).toBe(405);
        });
    });

    describe("PUT /v1/user/self", () => {
        it("should return 204 when the user is updated successfully", async () => {
            const userData = {
                first_name: "test",
                last_name: "sharma",
            };

            const response = await request(app)
                .put("/v1/user/self")
                .auth(email, "12345")
                .send(userData);

            expect(response.status).toBe(204);
        });

        it("should return 400 when the request data is invalid", async () => {
            const invalidUserData = {
                email: email,
            };

            const response = await request(app)
                .put("/v1/user/self")
                .auth(email, "12345")
                .send(invalidUserData);

            expect(response.status).toBe(400);
        });

        it("should return 401 when the request not authenticated", async () => {
            const invalidUserData = {
                email: email,
            };

            const response = await request(app)
                .put("/v1/user/self")
                .send(invalidUserData);

            expect(response.status).toBe(401);
        });

        it("should return 405 when the request method is not supported", async () => {
            const response = await request(app).post("/v1/user/self").send();
            expect(response.status).toBe(405);
        });
    });

    describe("GET /v1/user/self", () => {
        it("should return 200 when the user fetched", async () => {
            const response = await request(app)
                .get("/v1/user/self")
                .auth(email, "12345")
                .send();

            expect(response.status).toBe(200);
            expect(response.body).toBeDefined();
        });

        it("should return 400 when the request data is invalid", async () => {
            const invalidUserData = {
                email: email,
            };

            const response = await request(app)
                .get("/v1/user/self")
                .auth(email, "12345")
                .send(invalidUserData);

            expect(response.status).toBe(400);
        });

        it("should return 401 when the request is not authenticated", async () => {
            const response = await request(app).get("/v1/user/self").send();

            expect(response.status).toBe(401);
        });

        it("should return 405 when the request method is not supported", async () => {
            const response = await request(app).options("/v1/user/self").send();
            expect(response.status).toBe(405);
        });
    });
    
});
