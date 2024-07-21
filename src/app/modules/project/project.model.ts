import { Schema, model } from "mongoose";
import { TProject } from "./project.interface";

const projectSchema = new Schema<TProject>({
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
  image:  String
  ,

},{
  timestamps: true,

});

export const Project = model<TProject>("Project", projectSchema);



// Price  : number
// quantity : number
// isDeleted : boolean
// color : string
// type :  string 
// Size : string
// fragrance : string
// bloomDate: Date