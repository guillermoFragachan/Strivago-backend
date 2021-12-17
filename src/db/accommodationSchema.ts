import mongoose from "mongoose";

const { Schema } = mongoose;

export const AccommodationSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  maxGuests: { type: Number, required: true },
  city: { type: mongoose.Schema.Types.ObjectId, ref: "Destination" },
});
