import { JwtPayload } from "jsonwebtoken";
import QueryBuilder from "../../builder/QueryBuilder";
import { TBlog } from "./blog.interface";
import { Blog } from "./blog.model";

const createBlogIntoDB = async (userData:JwtPayload,payload: TBlog) => {
const slugName=payload.name.split(' ').join('-');

  const result = await Blog.create({...payload,createdBy:userData._id,slug:slugName});

  return result;
};

const getAllBlogFromDB = async (query: Record<string, unknown>) => {


  const productQuery = new QueryBuilder(
    Blog.find()
    ,
    query,
  )
    .search(['name','color'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await productQuery.countTotal();
  const result = await productQuery.modelQuery;

  return {
    meta,
    result,
  };
  // const result = await Blog.find({isDeleted:false}).populate('createdBy');

  // return result;
};

const getSingleBlogFromDB = async (slug: string) => {
  const result = await Blog.findOne({slug});

  return result;
};


const getFilterOptionsFromDB = async () => {
  const result = await Blog.aggregate([
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

const deleteBlogIntoDB = async (productSlugs: string[]) => {
  console.log('productSlugs :>> ', productSlugs);
  const result = await Blog.updateMany({
    slug:
        {
            $in:productSlugs
                
        }
},
{
   $set: { isDeleted: true} 


},
{upsert: true,multi: true }
  );

  return result;
};

const updateBlogIntoDB = async (
  id: string,
  payload: Partial<TBlog>
) => {

  console.log('payload', payload)
  const result = await Blog.findByIdAndUpdate(id, payload);

  return result;
};
export const BlogServices = {
  createBlogIntoDB,
  getAllBlogFromDB,
  getSingleBlogFromDB,
  deleteBlogIntoDB,
  updateBlogIntoDB,
  getFilterOptionsFromDB
};
