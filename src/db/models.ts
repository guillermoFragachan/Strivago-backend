import { AccommodationSchema } from "./accommodationSchema";
import mongoose from "mongoose";
import { DestinationSchema } from "./destinationSchema";
import {UserSchema} from './userSchema'

const { model } = mongoose;

export const AccommodationModel = model("accommodations", AccommodationSchema);
export const DestinationModel = model("Destination", DestinationSchema);
export const UserModel = model<any>("User", UserSchema)
