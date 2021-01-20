import { getFixturePath, readFixtureFile } from '../__fixtures__/utils.js';
import genDiff from '../src/index.js';

let expectedTextToEqualFiles;

beforeAll(() => {
  expectedTextToEqualFiles = readFixtureFile('expected_equal.txt');
});

test('Comparison stylish format - 2 equal yaml files', () => {
  const result = genDiff(getFixturePath('file1.yml'), getFixturePath('file1.yml'));
  expect(result).toMatch(expectedTextToEqualFiles);
});

test.each([
  ['plain', 'json and json', 'file1.json', 'file2.json', 'expected_plain.txt'],
  ['plain', 'yaml and yaml', 'file1.yml', 'file2.yml', 'expected_plain.txt'],
  ['stylish', 'json and json', 'file1.json', 'file2.json', 'expected.txt'],
  ['stylish', 'yaml and yaml', 'file1.yml', 'file2.yml', 'expected.txt'],
])('Comparison %s format - %s', (format, desc, first, second, expected) => {
  const result = genDiff(getFixturePath(first), getFixturePath(second), format);
  expect(result).toMatch(readFixtureFile(expected));
});
