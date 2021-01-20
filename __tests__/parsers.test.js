import { readFixtureFile } from '../__fixtures__/utils.js';
import parse from '../src/parsers.js';

test('Parse JSON data', () => {
  const expected = {
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

  expect(parse(readFixtureFile('file1.json'), '.json')).toEqual(expected);
  expect(parse(readFixtureFile('file1.yml'), '.yml')).toEqual(expected);
});
