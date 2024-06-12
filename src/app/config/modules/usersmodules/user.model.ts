import { Schema, model, connect } from "mongoose";
import { Users } from "./user.interface";



const userSchema = new Schema<Users>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], required: true },
});

export const UsersModel = model<Users>("Users", userSchema);