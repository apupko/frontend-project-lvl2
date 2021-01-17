import { readFixtureFile } from '../__fixtures__/utils.js';
import { getDifferences, genString } from '../src/gendiff.js';

let firstJson;
let secondJson;
let expectedObj;
let expectedText;

beforeAll(() => {
  firstJson = readFixtureFile('file1.json');
  secondJson = readFixtureFile('file2.json');
  expectedText = readFixtureFile('expected.txt');

  expectedObj = {
    follow: 'removed',
    host: 'no_change',
    proxy: 'removed',
    timeout: 'modify',
    verbose: 'added',
  };
});
test('Generate diff from 2 obj', () => {
  const firstObj = JSON.parse(firstJson);
  const secondObj = JSON.parse(secondJson);
  const diffObj = getDifferences(firstObj, secondObj);
  expect(diffObj).toEqual(expectedObj);
  const diffString = genString(firstObj, secondObj, diffObj);
  expect(diffString).toEqual(expectedText);
});
