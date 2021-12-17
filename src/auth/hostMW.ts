import createHttpError from "http-errors";
import  IUser  from "../interfaces/Iuser";


export const hostMiddleware = (req:any, res:any, next:any) => {
  if (req.user.role === "Host") {
    next();
  } else {
    next(createHttpError(403, "Hosts Only!"));
  }
};