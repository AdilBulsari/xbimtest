const request = require("supertest");
const app = require("../app");

describe("app tests", () => {
  test("GET /api/rooms return all rooms", () => {
    const data = ["RoomA", "RoomB", "RoomC"];
    return request(app)
      .get("/api/rooms")
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(data);
      });
  });

  test("GET /api/rooms/:id return room by id", () => {
    const data = [
      {
        id: 1,
        name: "RoomA",
        furnitures: ["table", "chair", "computer desk", "dresser", "wardrobe"],
      },
    ];
    return request(app)
      .get("/api/rooms/1")
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual(data);
      });
  });
  test("Status 400 /api/rooms/:invalid id", () => {
    return request(app)
      .get("/api/rooms/not-an-id")
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toEqual("id does not exist / invalid id");
      });
  });

  test("Status 400 /api/rooms/:invalid-id/furnitures ", () => {
    return request(app)
      .get("/api/rooms/not-an-id/furnitures")
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toEqual("id does not exist / invalid id");
      });
  });

  test("GET /api/rooms/:id/furnitures return furnitures for room", () => {
    const data = {
      furnitures: ["table", "chair", "computer desk", "dresser", "wardrobe"],
    };

    return request(app)
      .get("/api/rooms/1/furnitures")
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual(data);
      });
  });
});
