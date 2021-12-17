import mongoose from "mongoose";

const { Schema } = mongoose;

export const DestinationSchema = new Schema({
  country: { type: String, required: true },
  city: { type: String, required: true },
});
