import express from "express";
import mongoose from "mongoose";
import { server } from "./app";
import listEndpoints from "express-list-endpoints";

const port = process.env.PORT! || 3000;

// Db connection
mongoose.connect(process.env.MONGODB_URL!).then(() => {
  console.log("mongoDB Connected");
  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.table(listEndpoints(server));
  });
});
