import { Types } from "mongoose";

export type TProduct = {
  name: string;
  slug: string;
  description: string;
  images: string[];


  createdBy:Types.ObjectId;
price  : number
quantity : number
isDeleted : boolean
color : string
type :  string 
size : string
fragrance : string
bloomDate: Date

};
