import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }

    return this;
  }

  filter() {
    const queryObj = { ...this.query }; // copy
    // Filtering
    const excludeFields = ['searchTerm', 'sortBy', 'limit', 'page', 'fields','minPrice','maxPrice','tags','level','startDate','endDate','sales','toDate','fromDate','types','sizes','fragrances','productStock','undefined','bloomToDate','bloomFromDate'];

    excludeFields.forEach((el) => delete queryObj[el]);
    
    if (this.query.minPrice !== undefined && this.query.maxPrice === undefined) {
        queryObj.price = { $gte: Number( this.query.minPrice) };
    }


    if (this.query.productStock) {
      queryObj.quantity = { $gte: 1};
      if(this.query.productStock==="Out Of Stock"){
        queryObj.quantity = { $eq: 0};

      }
  }


    if (this.query.types !== undefined) {
        
      queryObj.type = { $in: JSON.parse(this.query.types as string) };
      
  }
  if (this.query.sizes !== undefined) {
        
    queryObj.size = { $in: JSON.parse(this.query.sizes as string) };
    
}
if (this.query.fragrances !== undefined) {
        
  queryObj.fragrance = { $in: JSON.parse(this.query.fragrances as string) };
  
}


    
    if (this.query.maxPrice !== undefined) {
        
        queryObj.price = {$gte: Number( this.query.minPrice ||0) , $lte: Number(this.query.maxPrice) };
        
    }


    const tags: Record<string, unknown> = { isDeleted: false };
    
    if (this.query.tags) {
        tags.name = this.query.tags;
        queryObj.tags =  { $elemMatch: tags } 
        
    }

    if (this.query.tags) {
      tags.name = this.query.tags;
      queryObj.tags =  { $elemMatch: tags } 
      
  }


  const today = new Date();

  if (this.query.fromDate && this.query.toDate) {
    const fromDate = new Date(this.query.fromDate as string);
    const toDate = new Date(this.query.toDate as string);
    toDate.setDate(toDate.getDate() + 1); //
    queryObj.soldDate= { $gte: fromDate, $lte: toDate }
  }

  if (this.query.bloomFromDate && this.query.bloomToDate) {
    const bloomFromDate = new Date(this.query.bloomFromDate as string);
    const bloomToDate = new Date(this.query.bloomToDate as string);
    bloomToDate.setDate(bloomToDate.getDate() + 1); //
    queryObj.bloomDate= { $gte: bloomFromDate, $lte: bloomToDate }
  }

  if (this.query.sales) {

  
  switch (this.query.sales) {
    case 'Weekly':
      
    queryObj.soldDate= { $gte:  today.setDate(today.getDate() - 7) }
        break;
        case 'Daily':
          today.setHours(0, 0, 0, 0); 
    queryObj.soldDate= { $gte: today }

            break;
            case 'Monthly':
              const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
          
queryObj.soldDate= { $gte: firstDayOfMonth, $lte: lastDayOfMonth }

                break;
                case 'Yearly':
                  const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
                  const lastDayOfYear = new Date(today.getFullYear() + 1, 0, 0);
              
    queryObj.soldDate= { $gte: firstDayOfYear, $lte: lastDayOfYear }
    
                    break;
      default:
        break;
    }
    
}
    
    
  


  if (this.query.level) {
    queryObj['details.level']=this.query.level    
}


if (this.query.startDate !== undefined) {
    queryObj.startDate = { $gte: this.query.startDate as string } as FilterQuery<T>['startDate'];
  }

  if (this.query.endDate !== undefined) {
    if (!queryObj.startDate) {
      queryObj.startDate = {} as FilterQuery<T>['startDate'];
    }
    (queryObj.startDate as FilterQuery<T>['startDate']).$lte = this.query.endDate
  }



    
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }

  sort() {
    const sort =
      (this?.query?.sortBy as string)?.split(',')?.join(' ') || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort as string);

    return this;
  }

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(totalQueries);
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const totalPage = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPage,
    };
  }
}

export default QueryBuilder;