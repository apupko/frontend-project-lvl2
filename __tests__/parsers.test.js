import { readFixtureFile } from '../__fixtures__/utils.js';
import parse from '../src/parsers.js';

let jsonData;
let yamlData;
let textData;
let expected;

beforeAll(() => {
  jsonData = readFixtureFile('file1.json');
  yamlData = readFixtureFile('file1.yml');
  textData = readFixtureFile('expected.txt');
  expected = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };
});

test('Parse JSON data', () => {
  expect(parse(jsonData)).toEqual(expected);
});

test('Parse YAML data', () => {
  expect(parse(yamlData)).toEqual(expected);
});

test('Parse wrong format data', () => {
  expect(() => parse(textData)).toThrow(Error);
});
