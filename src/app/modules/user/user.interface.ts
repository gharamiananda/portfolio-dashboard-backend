import { Model } from "mongoose";
import { Document } from "mongoose";

export interface TUser extends Document {
  name: string;
  email: string;
passwordChangeAt?: Date;
  password: string;
  needPasswordChange: boolean;
  isDeleted: boolean;
  status:'active' | 'blocked'
};




export interface UserModel extends  Model<TUser> {
  //instance methods for checking if the user exist
  isUserExistsByEmail(email: string): Promise<TUser>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
