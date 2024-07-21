import { Schema, model } from "mongoose";
import { TProduct } from "./product.interface";

const productSchema = new Schema<TProduct>({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
    required: true,
  },
   description: {
    type: String
  }, 
  images:  [String]
  ,


  createdBy:{
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,

  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },isDeleted: {
    type: Boolean,
    default: false,
  },color: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },size: {
    type: String,
    required: true,
  },fragrance: {
    type: String,
    required: true,
  },
  bloomDate: {
    type: Date,
    required: true,
  },
},{
  timestamps: true,

});

export const Product = model<TProduct>("Product", productSchema);



// Price  : number
// quantity : number
// isDeleted : boolean
// color : string
// type :  string 
// Size : string
// fragrance : string
// bloomDate: Date