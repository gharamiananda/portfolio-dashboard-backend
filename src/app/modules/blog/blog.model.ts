import { Schema, model } from "mongoose";
import { TBlog } from "./blog.interface";

const blogSchema = new Schema<TBlog>({
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
    type: String,
    required: true,

  }, 
},{
  timestamps: true,

});

export const Blog = model<TBlog>("Blog", blogSchema);



// Price  : number
// quantity : number
// isDeleted : boolean
// color : string
// type :  string 
// Size : string
// fragrance : string
// bloomDate: Date