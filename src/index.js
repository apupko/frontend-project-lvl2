import fs from 'fs';
import path from 'path';
import getDiffString from './gendiff.js';

const genDiff = (filepath1, filepath2) => {
  const firstFile = fs.readFileSync(path.resolve(filepath1), 'utf8');
  const secondFile = fs.readFileSync(path.resolve(filepath2), 'utf8');

  const firstObj = JSON.parse(firstFile);
  const secondObj = JSON.parse(secondFile);

  return getDiffString(firstObj, secondObj);
};

export default genDiff;
