import { readFixtureFile } from '../__fixtures__/utils.js';
import getDifference from '../src/gendiff.js';

let firstJson;
let secondJson;
let expectedJson;

beforeAll(() => {
  firstJson = readFixtureFile('file1.json');
  secondJson = readFixtureFile('file2.json');
  expectedJson = readFixtureFile('expected_difference.json');
});

test('Generate difference from 2 obj', () => {
  const firstObj = JSON.parse(firstJson);
  const secondObj = JSON.parse(secondJson);
  const expectedObj = JSON.parse(expectedJson);
  const diffObj = getDifference(firstObj, secondObj);
  expect(diffObj).toEqual(expectedObj);
});
