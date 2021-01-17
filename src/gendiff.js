import _ from 'lodash';

const MODIFY = 'modify';
const ADDED = 'added';
const REMOVED = 'removed';
const NO_CHANGE = 'no_change';

const getKeyDifference = (first, second, key) => {
  if (second[key] === undefined) {
    return REMOVED;
  }
  if (first[key] === undefined) {
    return ADDED;
  }
  if (first[key] === second[key]) {
    return NO_CHANGE;
  }
  return MODIFY;
};

export const getDifferences = (first, second) => {
  const sortedKeys = _.sortBy(Object.keys({ ...first, ...second }));
  const differences = sortedKeys.reduce((acc, key) => (
    { ...acc, [key]: getKeyDifference(first, second, key) }
  ), {});
  return differences;
};

const getKeyStylishString = (firstObj, secondObj, key, diffference) => {
  const mapping = {
    [NO_CHANGE]: `    ${key}: ${secondObj[key]}\n`,
    [ADDED]: `  + ${key}: ${secondObj[key]}\n`,
    [MODIFY]: `  - ${key}: ${firstObj[key]}\n  + ${key}: ${secondObj[key]}\n`,
    [REMOVED]: `  - ${key}: ${firstObj[key]}\n`,
  };
  return mapping[diffference];
};

export const genString = (firstObj, secondObj, diffObj) => {
  const diffString = Object.entries(diffObj)
    .map(([key, value]) => getKeyStylishString(firstObj, secondObj, key, value)).join('');
  return `{\n${diffString}}\n`;
};

export default (firstObj, secondObj) => {
  const diffObj = getDifferences(firstObj, secondObj);
  return genString(firstObj, secondObj, diffObj);
};
