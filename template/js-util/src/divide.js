/**
 * @name divide
 *
 * @summary 인자로 받은 두 숫자를 나누는 함수
 *
 * @param  {number} a
 * @param  {number} b
 * @returns {number}
 */
function divide(a, b) {
  if (b === 0) {
    throw Error('0으로 나눌 수 없습니다');
  }
  return a / b;
}
export default divide;
