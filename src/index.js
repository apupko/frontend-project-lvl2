import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import getDifference from './gendiff.js';
import format from './formaters/formaters.js';

const genDiff = (filepath1, filepath2, formatType = 'stylish') => {
  const firstFile = fs.readFileSync(path.resolve(filepath1), 'utf8');
  const secondFile = fs.readFileSync(path.resolve(filepath2), 'utf8');
  let result = '';
  try {
    const firstObj = parse(firstFile);
    const secondObj = parse(secondFile);
    const diffObj = getDifference(firstObj, secondObj);
    result = format(diffObj, formatType);
  } catch (e) {
    console.log(e.message);
  }
  return result;
};

export default genDiff;
