import { readFixtureFile } from '../__fixtures__/utils.js';
import getDifference from '../src/gendiff.js';

test('Generate difference from 2 obj', () => {
  const firstObj = JSON.parse(readFixtureFile('file1.json'));
  const secondObj = JSON.parse(readFixtureFile('file2.json'));
  const expectedObj = JSON.parse(readFixtureFile('expected_difference.json'));
  const diffObj = getDifference(firstObj, secondObj);
  expect(diffObj).toEqual(expectedObj);
});
