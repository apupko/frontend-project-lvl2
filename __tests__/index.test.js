import { getFixturePath, readFixtureFile } from '../__fixtures__/utils.js';
import genDiff from '../src/index.js';

let expectedTextStylish;
let expectedTextPlain;
let expectedTextToEqualFiles;

beforeAll(() => {
  expectedTextStylish = readFixtureFile('expected.txt');
  expectedTextPlain = readFixtureFile('expected_plain.txt');
  expectedTextToEqualFiles = readFixtureFile('expected_equal.txt');
});

test('Comparison stylish format - 2 equal yaml files', () => {
  const result = genDiff(getFixturePath('file1.yml'), getFixturePath('file1.yml'));
  expect(result).toMatch(expectedTextToEqualFiles);
});

test.each([
  ['stylish', 'json and json', 'file1.json', 'file2.json'],
  ['stylish', 'yaml and yaml', 'file1.yml', 'file2.yml'],
  ['stylish', 'json and yaml', 'file1.json', 'file2.yml'],
])('Comparison %s format - %s', (format, desc, first, second) => {
  const result = genDiff(getFixturePath(first), getFixturePath(second), format);
  expect(result).toMatch(expectedTextStylish);
});

test.each([
  ['plain', 'json and json', 'file1.json', 'file2.json'],
  ['plain', 'yaml and yaml', 'file1.yml', 'file2.yml'],
  ['plain', 'json and yaml', 'file1.json', 'file2.yml'],
])('Comparison %s format - %s', (format, desc, first, second) => {
  const result = genDiff(getFixturePath(first), getFixturePath(second), format);
  expect(result).toMatch(expectedTextPlain);
});
