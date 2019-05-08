import React from 'react';
import ReactDOM from 'react-dom';

import Hello from './components/Hello';

import './style.css';

function* generator(i: number) {
  yield i;
  yield i + 10;
}

const gen = generator(10);

console.log(gen.next().value);
// expected output: 10

console.log(gen.next().value);
// expected output: 20

const sym = Symbol('test');
const a = { [sym]: 1 };
console.log('a', a);

const promise = new Promise(resolve => {
  resolve();
});
promise.then(() => {
  console.log('test');
});

const arr: number[] = [11, 22];

console.log(arr[Symbol.iterator]());

class Person {
  public abc = 1;

  public aa() {
    return this.abc;
  }
}

console.log(new Person().aa());

ReactDOM.render(<Hello text="world" />, document.getElementById('root'));

throw new Error('??');
