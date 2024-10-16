const request = require("supertest");

const BASE_URL = `http://localhost:${process.env.PORT || 3000}`;

describe("JWT and permissions API tests", () => {
  const regularUsername =
    "regular_user_" + Math.random().toString(36).substring(2, 15);
  const adminUsername =
    "regular_user_" + Math.random().toString(36).substring(2, 15);
  const testUsername =
    "test_user_" + Math.random().toString(36).substring(2, 15);

  let adminAccessToken;
  let userAccessToken;
  let userRefreshToken;

  beforeAll(async () => {
    // Create an admin user and a regular user for testing
    await request(BASE_URL).post("/api/users/register").send({
      username: adminUsername,
      password: "adminPass",
      role: "ADMIN",
    });

    await request(BASE_URL).post("/api/users/register").send({
      username: regularUsername,
      password: "userPass",
      role: "USER",
    });

    // Log in as admin and user to obtain tokens
    const adminLoginResponse = await request(BASE_URL)
      .post("/api/users/login")
      .send({
        username: adminUsername,
        password: "adminPass",
      });
    adminAccessToken = adminLoginResponse.body.accessToken;

    const userLoginResponse = await request(BASE_URL)
      .post("/api/users/login")
      .send({
        username: regularUsername,
        password: "userPass",
      });
    userAccessToken = userLoginResponse.body.accessToken;
    userRefreshToken = userLoginResponse.body.refreshToken;
  });

  describe("Task 1: User registration", () => {
    it("should create a new user", async () => {
      const response = await request(BASE_URL)
        .post("/api/users/register")
        .send({
          username: testUsername,
          password: "testPass",
          role: "USER",
        });

      expect(response.status).toBe(201);
      expect(response.body.user).toHaveProperty("id");
      expect(response.body.user.username).toBe(testUsername);
    });

    it("should fail to create a user with an existing username", async () => {
      const response = await request(BASE_URL)
        .post("/api/users/register")
        .send({
          username: testUsername,
          password: "anotherPass",
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
    });
  });

  describe("Task 2: User login and JWT generation", () => {
    it("should log in and return a JWT", async () => {
      const response = await request(BASE_URL).post("/api/users/login").send({
        username: testUsername,
        password: "testPass",
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("accessToken");
    });

    it("should fail to log in with incorrect credentials", async () => {
      const response = await request(BASE_URL).post("/api/users/login").send({
        username: testUsername,
        password: "wrongPass",
      });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("error");
    });
  });

  describe("Task 3: Protecting routes with JWT middleware", () => {
    it("should allow access to protected route with valid token", async () => {
      const response = await request(BASE_URL)
        .get("/api/protected")
        .set("Authorization", `Bearer ${userAccessToken}`);

      expect(response.status).toBe(200);
    });

    it("should deny access to protected route with no token", async () => {
      const response = await request(BASE_URL).get("/api/protected");

      expect(response.status).toBe(401);
    });

    it("should deny access to protected route with invalid token", async () => {
      const response = await request(BASE_URL)
        .get("/api/protected")
        .set("Authorization", `Bearer invalidToken`);

      expect(response.status).toBe(401);
    });
  });

  describe("Task 4: Role-based permissions", () => {
    it("should allow access to admin route with ADMIN role", async () => {
      const response = await request(BASE_URL)
        .get("/api/admin/protected")
        .set("Authorization", `Bearer ${adminAccessToken}`);

      expect(response.status).toBe(200);
    });

    it("should deny access to admin route with USER role", async () => {
      const response = await request(BASE_URL)
        .get("/api/admin/protected")
        .set("Authorization", `Bearer ${userAccessToken}`);

      expect(response.status).toBe(403);
    });
  });

  describe("Task 5: Refreshing JWTs", () => {
    it("should refresh the token", async () => {
      const refreshResponse = await request(BASE_URL)
        .post("/api/users/refresh")
        .send({
          refreshToken: userRefreshToken,
        });

      expect(refreshResponse.status).toBe(200);
      expect(refreshResponse.body).toHaveProperty("accessToken");
    });

    it("should deny refresh with expired or invalid token", async () => {
      const refreshResponse = await request(BASE_URL)
        .post("/api/users/refresh")
        .send({
          refreshToken: "expiredOrInvalidToken",
        });

      expect(refreshResponse.status).toBe(401);
      expect(refreshResponse.body).toHaveProperty("error");
    });
  });
});