import { itemsInArray, isArrOfNumbers } from './arrays';

interface IQuery {
  filename: string;
  width: number;
  height: number;
}

// Checks if all 3 parameters are being set in the URL
const checkParams = (query: IQuery): boolean => {
  const params: string[] = ['filename', 'width', 'height'];
  const paramsKeys: string[] = Object.keys(query);
  const widthAndHeight: number[] = [Number(query.width), Number(query.height)];

  // check if all the required parameters (params) are included in the query (paramsKeys) and if the width and height are both numbers
  return itemsInArray(params, paramsKeys) && isArrOfNumbers(widthAndHeight);
};

export { checkParams, IQuery };
