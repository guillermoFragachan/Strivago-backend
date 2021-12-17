import express from "express";

import accommodationRouter from "./accommodation";
import destinationRouter from "./destination";
import usersRouter from "./users"

const server = express();

process.env.TS_NODE_DEV && require("dotenv").config();

server.use(express.json());

// cors middleware's
// server.use(cors);

// Endpoints
server.use("/accommodations", accommodationRouter);
server.use("/destinations", destinationRouter);
server.use('/users', usersRouter)
export { server };
