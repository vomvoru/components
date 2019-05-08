const n: number | string = 3;

test('a+b', done => {
  expect(n).toBe(3);
  done();
});
