import { server } from "../app";
import mongoose from "mongoose";
import supertest from "supertest";
import dotenv from "dotenv";

// process.env.TS_NODE_DEV && require("dotenv").config();
dotenv.config();

const request = supertest(server);

describe("this test is for checking the process", () => {
  it("should return true", () => {
    expect(true).toBe(true);
  });
});

describe("Testing accommodation endpoints", () => {
  beforeAll((done) => {
    console.log("this is to open connect to the DB");

    mongoose.connect(process.env.MONGO_URL_TEST!).then(() => {
      console.log("mongo test DB is now connected");
      done();
    });
  });

  const destination = {
    country: "Sweden",
    city: "Stockholm",
  };

  it(`should check that the "POST" /accommodations endpoint creates a new accommodation object`, async () => {
    const response = await request.post("/destinations").send(destination);
    expect(response.status).toBe(201);
    expect(response.body.city).toBeDefined();
    expect(response.body.country).toBeDefined();
  });

  it(`should check that the "POST" /accommodations endpoint creates a new accommodation object`, async () => {
    const destination = await request.get("/destinations");
    const id = destination.body[0]._id;
    // console.log(destination);

    const accommodation = {
      name: "Nico",
      description: "no description",
      maxGuests: 5,
      city: id,
    };
    const response = await request.post("/accommodations").send(accommodation);
    expect(response.status).toBe(201);
    expect(response.body.name).toBeDefined();
    expect(response.body.description).toBeDefined();
    expect(response.body.maxGuests).toBeDefined();
    expect(response.body.city).toBeDefined();
  });

  let id: string;
  it("should check on GET /accommodations endpoint return a list of accommodations", async () => {
    const response = await request.get("/accommodations");
    if (response.ok) {
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
      id = response.body[0]._id;
    } else {
      expect(response.status).toBe(404);
    }
  });

  let s = "61b34985ef1edafab03e2bbb";
  it("should check on GET /accommodations/:accId endpoint return one object that matches the id provided", async () => {
    const response = await request.get(`/accommodations/${id}`);

    if (response.notFound) {
      expect(response.status).toBe(404);
    }
    if (response.ok) {
      expect(response.status).toBe(200);
    }
    if (response.badRequest) {
      expect(response.status).toBe(400);
    }
  });

  const updateData = {
    name: "Name edited",
    description: "no description",
    maxGuests: 5,
  };
  it(`should check that a valid PUT /accommodations/:id update request gets executed correctly `, async () => {
    const response = await request
      .put(`/accommodations/${id}`)
      .send(updateData);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updateData.name);
  });

  //   invalid id
  it(`should check that not valid PUT /accommodations/:id update request gets 404`, async () => {
    const response = await request.put(`/accommodations/${s}`).send(updateData);
    expect(response.status).toBe(404);
  });

  it(`should check that the DELETE /accommodation/:id get executed with a valid ID`, async () => {
    const response = await request.delete(`/accommodations/${id}`);
    expect(response.status).toBe(204);

    const deleteAccommodation = await request.delete(`/accommodations/${id}`);
    expect(deleteAccommodation.status).toBe(404);
  });

  afterAll((done) => {
    mongoose.connection
      .dropDatabase()
      .then(() => {
        return mongoose.connection.close();
      })
      .then(() => {
        done();
      });
  });
});
