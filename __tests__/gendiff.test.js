import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getDifferences, genString } from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let firstJson;
let secondJson;
let expectedObj;
let expectedString;

beforeAll(() => {
  firstJson = readFile('file1.json');
  secondJson = readFile('file2.json');

  expectedObj = {
    follow: 'removed',
    host: 'no_change',
    proxy: 'removed',
    timeout: 'modify',
    verbose: 'added',
  };

  expectedString = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
});

test('Generate diff from 2 obj', () => {
  const firstObj = JSON.parse(firstJson);
  const secondObj = JSON.parse(secondJson);
  const diffObj = getDifferences(firstObj, secondObj);
  expect(diffObj).toEqual(expectedObj);
  const diffString = genString(firstObj, secondObj, diffObj);
  expect(diffString).toEqual(expectedString);
});
