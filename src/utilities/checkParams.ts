// Checks if all 3 parameters are being set in the URL
const checkParams = (arr: string[]): boolean => {
  const params = ['filename', 'width', 'height'];
  return params.every((item) => arr.indexOf(item) !== -1);
};

export default checkParams;
