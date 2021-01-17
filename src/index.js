import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import getDiffString from './gendiff.js';

const genDiff = (filepath1, filepath2) => {
  const firstFile = fs.readFileSync(path.resolve(filepath1), 'utf8');
  const secondFile = fs.readFileSync(path.resolve(filepath2), 'utf8');
  let result = '';
  try {
    const firstObj = parse(firstFile);
    const secondObj = parse(secondFile);
    result = getDiffString(firstObj, secondObj);
  } catch (e) {
    console.log(e.message);
  }
  return result;
};

export default genDiff;
