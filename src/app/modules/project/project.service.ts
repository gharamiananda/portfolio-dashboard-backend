import { JwtPayload } from "jsonwebtoken";
import QueryBuilder from "../../builder/QueryBuilder";
import { Project } from "./project.model";
import { TProject } from "./project.interface";

const createProjectIntoDB = async (userData:JwtPayload,payload: TProject) => {
const slugName=payload.name.split(' ').join('-');

  const result = await Project.create({...payload,createdBy:userData._id,slug:slugName});

  return result;
};

const getAllProjectsFromDB = async (query: Record<string, unknown>) => {


  const ProjectQuery = new QueryBuilder(
    Project.find()
     ,
    query,
  )
    .search(['name','color'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await ProjectQuery.countTotal();
  const result = await ProjectQuery.modelQuery;

  return {
    meta,
    result,
  };
  // const result = await Project.find({isDeleted:false}).populate('createdBy');

  // return result;
};

const getSingleProjectFromDB = async (slug: string) => {
  const result = await Project.findOne({slug});

  return result;
};


const getFilterOptionsFromDB = async () => {
  const result = await Project.aggregate([
    {
      $group: {
        _id: null,
        types: { $addToSet: "$type" },
        sizes: { $addToSet: "$size" },
        colors: { $addToSet: "$color" },
        fragrances: { $addToSet: "$fragrance" }
      }
    },
    {
      $project: {
        _id: 0, // Exclude the _id field from the result
        types: 1,
        sizes: 1,
        colors: 1,
        fragrances: 1
      }
    }
  ]);

  return result;
};

const deleteProjectsIntoDB = async (ProjectSlugs: string[]) => {
  console.log('ProjectSlugs :>> ', ProjectSlugs);
  const result = await Project.updateMany({
    slug:
        {
            $in:ProjectSlugs
                
        }
},
{
   $set: { isDeleted: true} 


},
{upsert: true,multi: true }
  );

  return result;
};

const updateProjectIntoDB = async (
  id: string,
  payload: Partial<TProject>
) => {
  const result = await Project.findByIdAndUpdate(id, payload);

  return result;
};
export const ProjectServices = {
  createProjectIntoDB,
  getAllProjectsFromDB,
  getSingleProjectFromDB,
  deleteProjectsIntoDB,
  updateProjectIntoDB,
  getFilterOptionsFromDB
};
