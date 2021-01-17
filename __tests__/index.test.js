import { getFixturePath, readFixtureFile } from '../__fixtures__/utils.js';
import genDiff from '../src/index.js';

let expectedText;
let expectedTextToEqualFiles;

beforeAll(() => {
  expectedText = readFixtureFile('expected.txt');
  expectedTextToEqualFiles = readFixtureFile('expected_equal.txt');
});

test('Comparison 2 plain json files', () => {
  const result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(result).toMatch(expectedText);
});

test('Comparison 2 plain yaml files', () => {
  const result = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
  expect(result).toMatch(expectedText);
});

test('Comparison 2 equal files', () => {
  const result = genDiff(getFixturePath('file1.yml'), getFixturePath('file1.yml'));
  expect(result).toMatch(expectedTextToEqualFiles);
});

test('Comparison json file with yaml file', () => {
  const result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.yml'));
  expect(result).toMatch(expectedText);
});
