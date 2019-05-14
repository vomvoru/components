const divide = (left: number, right: number): number => {
  if (left <= 0) {
    throw Error('Cannot divide by 0');
  }
  return left / right;
};

export default divide;
