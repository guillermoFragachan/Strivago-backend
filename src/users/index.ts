import express from "express";
import createHttpError from "http-errors";
import { UserModel } from "../db/models.js";
import { JWTAuthenticate } from "../auth/tools.js";
import { AccommodationModel } from "../db/models.js";
import { JWTAuthMiddleware } from "../auth/token.js";
import { hostMiddleware } from "../auth/hostMW";

const usersRouter = express.Router();

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await UserModel.find();
    res.send(users);
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/register", async (req, res, next) => {
  try {
    const newUser = new UserModel(req.body);
    const { _id } = await newUser.save();
    const accessToken = await JWTAuthenticate(newUser);
    res.send({ ...newUser.toObject(), accessToken });
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/login", async (req:any, res:any, next:any) => {
  try {
    const { email, password } = req.body

    const emailT: string = email
    const passT: string = password

    const user = await UserModel.checkCredentials(email, password);

    if (user) {
      const accessToken = await JWTAuthenticate(user);

      res.send({ accessToken });
    } else {
      next(createHttpError(401, "Credentials are not ok!"));
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.get(
  "/me/accomodation",
  JWTAuthMiddleware,
  hostMiddleware,
  async (req:any, res, next) => {
    try {
      console.log(req.user._id.toString());
      const accomodations = await AccommodationModel.find({
        host: req.user._id.toString(),
      });

      res.status(200).send(accomodations);
    } catch (error) {
      next(error);
    }
  }
);

usersRouter.get("/me", JWTAuthMiddleware, async (req:any, res, next) => {
  try {
    console.log(req.user);
    res.send(req.user);
  } catch (error) {
    next(error);
  }
});

export default usersRouter;