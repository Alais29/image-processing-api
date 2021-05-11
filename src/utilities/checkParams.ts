const checkParams = (arr: string[]): boolean => {
  const params = ['filename', 'width', 'height'];
  return arr.every((item) => {
    return params.indexOf(item) !== -1;
  });
};

export default checkParams;