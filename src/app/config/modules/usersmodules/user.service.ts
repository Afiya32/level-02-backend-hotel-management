// user service

import { Users } from "./user.interface";
import { UsersModel } from "./user.model";
import bcrypt from 'bcryptjs';

const createUserDB = async (user: Users) => {
  // Hash password before saving
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  const result = await UsersModel.create(user);
  return result;
};

const findUserByEmail = async (email: string) => {
  const user = await UsersModel.findOne({ email });
  return user;
};

export const UserServices = {
  createUserDB,
  findUserByEmail,
};
