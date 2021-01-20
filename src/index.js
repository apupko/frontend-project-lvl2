import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import getDifference from './gendiff.js';
import format from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatType = 'stylish') => {
  const firstFile = fs.readFileSync(path.resolve(filepath1), 'utf8');
  const secondFile = fs.readFileSync(path.resolve(filepath2), 'utf8');
  const firstObj = parse(firstFile, path.extname(filepath1));
  const secondObj = parse(secondFile, path.extname(filepath2));
  const diffObj = getDifference(firstObj, secondObj);
  return format(diffObj, formatType);
};

export default genDiff;
