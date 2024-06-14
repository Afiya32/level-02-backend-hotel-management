// user service

import { Users } from "./user.interface";
import { UsersModel } from "./user.model";
import bcrypt from 'bcryptjs';

// sign up user database
const createUserDB = async (user: Users) => {
  // Hash password before saving
  try {
    const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  const result = await UsersModel.create(user);
  return result;
  } catch (error) {
    throw error;
  }
};
// find or login user 
const findUserByEmail = async (email: string) => {
  try {
    const user = await UsersModel.findOne({ email });
  return user;
  } catch (error) {throw error;
  }
};

export const UserServices = {
  createUserDB,
  findUserByEmail,
};
