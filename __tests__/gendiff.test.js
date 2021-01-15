import { getDifferences } from '../src/gendiff.js';

let firstObj;
let secondObj;
let expectedObj;

beforeEach(() => {
  firstObj = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: 'false',
  };

  secondObj = {
    timeout: 20,
    verbose: true,
    host: 'hexlet.io',
  };

  expectedObj = {
    follow: 'removed',
    host: 'no_change',
    proxy: 'removed',
    timeout: 'modify',
    verbose: 'added',
  };
});

test('Generate diff from 2 obj', () => {
  expect(getDifferences(firstObj, secondObj)).toEqual(expectedObj);
});
