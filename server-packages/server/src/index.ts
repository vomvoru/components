import express from 'express';
import Add from './Add';

const app = express();
const port = 3000;

app.get('/', (req, res) => res.send(`Hello World!${new Add(1, 2).result}`));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const array1 = [1, 2, 3];

console.log(array1.includes(2));
// expected output: true

const pets = ['cat', 'dog', 'bat'];

console.log(pets.includes('cat'));
// expected output: true

console.log(pets.includes('at'));
// expected output: false

Object.entries({ foo: 'bar' });

class Bork {
  // Static class properties
  public static staticProperty = 'babelIsCool';

  // Property initializer syntax
  public instanceProperty = 'bork';

  public static staticFunction = function() {
    return Bork.staticProperty;
  };

  public boundFunction = () => {
    return this.instanceProperty;
  };
}

const myBork = new Bork();

// Property initializers are not on the prototype.
console.log(myBork.__proto__.boundFunction); // > undefined

// Bound functions are bound to the class instance.
console.log(myBork.boundFunction.call(undefined)); // > "bork"

// Static function exists on the class.
console.log(Bork.staticFunction()); // > "babelIsCool"
