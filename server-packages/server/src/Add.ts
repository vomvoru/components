class Add {
  public a: number;

  public b: number;

  public result: number;

  public constructor(a: number, b: number) {
    this.a = a;
    this.b = b;
    this.result = a + b;
  }
}

const array1 = [1, 2, 3];

console.log(array1.includes(2));
// expected output: true

const pets = ['cat', 'dog', 'bat'];

console.log(pets.includes('cat'));
// expected output: true

console.log(pets.includes('at'));
// expected output: false

export default Add;
