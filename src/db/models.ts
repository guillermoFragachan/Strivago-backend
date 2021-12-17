import { AccommodationSchema } from "./accommodationSchema";
import mongoose from "mongoose";
import { DestinationSchema } from "./destinationSchema";
import {UserSchema} from './userSchema'
import IUser from '../interfaces/Iuser'
import {Model} from "mongoose"

const { model } = mongoose;

export const AccommodationModel = model("accommodations", AccommodationSchema);
export const DestinationModel = model("Destination", DestinationSchema);


interface UserModel extends Model<IUser> {
    checkCredentials(): any;
  }
export const UserModel = model<IUser, UserModel>("User", UserSchema)
