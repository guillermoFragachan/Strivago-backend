import mongoose from 'mongoose'
import bcrypt from "bcrypt"
import IUser from '../interfaces/Iuser'
import { Model } from 'mongoose';


interface UserModel extends Model<IUser> {
  checkCredentials(email:any, password:any): any;
}
const { Schema, model } = mongoose

export const UserSchema = new Schema<IUser, UserModel>({
  name: { type: String },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, default: "Guest", enum: ["Guest", "Host"] },
})

UserSchema.pre<any>("save", async function (next) {
  
  const newUser = this 
  const plainPw = newUser.password
  if (newUser.isModified("password")) {
    const hash = await bcrypt.hash(plainPw, 10)
    newUser.password = hash
  }
  next()
})

UserSchema.methods.toJSON = function () {
  const userDocument = this
  const userObject = userDocument.toObject()
  // delete userObject.password
  delete userObject.__v

  return userObject
}

UserSchema.statics.checkCredentials = async function (email:string, plainPw:string) {
  const user = await this.findOne({ email }) 

  if (user) {
    const isMatch = await bcrypt.compare(plainPw, user.password)
    if (isMatch) {
      return user
    } else {
      return null
    }
  } else {
    return null 
  }
}


