import { Types } from "mongoose";

export type TSales = {
nameOfBuyer: string
soldQuantity : number
soldDate:  Date,
product:Types.ObjectId;
totalPrice:number;


};
