import { AccommodationSchema } from "./accommodationSchema";
import mongoose from "mongoose";
import { DestinationSchema } from "./destinationSchema";

const { model } = mongoose;

export const AccommodationModel = model("accommodations", AccommodationSchema);
export const DestinationModel = model("Destination", DestinationSchema);
