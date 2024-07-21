import { BAD_REQUEST } from 'http-status';
import { TErrorSource } from '../interface/error';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleMongooseDuplicateError = (error: any) => {
  const allkeys = Object.keys(error.keyPattern);
  const errorMessage : string[]= []
  const errorSources: TErrorSource = allkeys.map((path) => {
    errorMessage.push(path)

    return ({
      path: path,
      message: 'Duplicate data',
    })
  });



  return {
    statusCode: BAD_REQUEST,
    message: `Duplicate data on ${errorMessage.join(', ')}`,
    errorSources,
  };
};
