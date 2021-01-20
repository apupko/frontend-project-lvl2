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
    common: {
      setting1: 'Value 1',
      setting2: 200,
      setting3: true,
      setting6: {
        doge: {
          wow: '',
        },
        key: 'value',
      },
    },
    group1: {
      baz: 'bas',
      foo: 'bar',
      nest: {
        key: 'value',
      },
    },
    group2: {
      abc: 12345,
      deep: {
        id: 45,
      },
    },
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
