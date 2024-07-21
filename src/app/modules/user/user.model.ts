import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import config from "../../config";
import bcrypt from 'bcrypt'
import { UserStatus } from "./user.constant";

const userSchema = new Schema<TUser,UserModel>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select:0
  },
  needPasswordChange:{
    type: Boolean,
    default: false
  },
  passwordChangeAt: {
    type: Date,
    
    select:0
  },
  isDeleted:{
    type: Boolean,
    default: false
  },
  status:{
    type: String,
    enum:UserStatus
  }
  

 
},{
  timestamps: true
});


userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

function transform(doc: any, ret: any): any {
  delete ret.password;
  delete ret.passwordChangeAt;
  delete ret.__v;
  return ret;
}

userSchema.set('toJSON', { transform });

userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};


export const User = model<TUser,UserModel>("User", userSchema);
