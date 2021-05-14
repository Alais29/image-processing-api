// Checks if all 3 parameters are being set in the URL
import { itemsInArray, isArrOfNumbers } from './arrays';

interface IQuery {
  filename: string
  width: number
  height: number
}

const checkParams = (query: IQuery): boolean => {
  const params: string[] = ['filename', 'width', 'height'];
  const paramsKeys: string[] = Object.keys(query);
  const widthAndHeight: number[] = [Number(query.width), Number(query.height)];

  return itemsInArray(params, paramsKeys) && isArrOfNumbers(widthAndHeight);
};

export {checkParams, IQuery};
