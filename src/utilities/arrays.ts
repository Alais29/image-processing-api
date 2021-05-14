const itemsInArray = (arr: unknown[], items: unknown[]): boolean => {
  return arr.every(item => items.indexOf(item) !== -1);
};

const isArrOfNumbers = (arr: unknown[]): boolean => {
  return arr.every(item => Number.isInteger(item));
};

export { itemsInArray, isArrOfNumbers };