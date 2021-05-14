// Checks if items in an array (items) are all included in another array (arr)
const itemsInArray = (arr: unknown[], items: unknown[]): boolean => {
  return arr.every((item) => items.indexOf(item) !== -1);
};

// Checks if the items in an array are all numbers
const isArrOfNumbers = (arr: unknown[]): boolean => {
  return arr.every((item) => Number.isInteger(item));
};

export { itemsInArray, isArrOfNumbers };
