import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let expectedText;

beforeAll(() => {
  expectedText = readFile('expected.txt');
});

test('Comparison 2 plain json files', () => {
  const result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(result).toMatch(expectedText);
});

test('Compariosn 2 plain yaml files', () => {
  const result = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
  expect(result).toMatch(expectedText);
});
