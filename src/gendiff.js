import _ from 'lodash';

export const ADDED = 'added';
export const REMOVED = 'removed';
export const UNCHANGED = null;
export const CHANGED = 'changed';

const getTypeName = (value) => {
  const typeString = Object.prototype.toString.call(value);
  return typeString.split(' ')[1].replace(']', '');
};

export const isObject = (value) => getTypeName(value) === 'Object';

const buildNode = (name, change, value, child) => {
  const obj = { name, change };
  return !child ? { ...obj, value } : { ...obj, child };
};

const getDifference = (firstObj, secondObj) => {
  const getKeyDifference = (first, second, key) => {
    if (!_.has(second, key)) {
      return buildNode(key, REMOVED, { current: first[key] });
    }
    if (!_.has(first, key)) {
      return buildNode(key, ADDED, { current: second[key] });
    }
    if (isObject(first[key]) && isObject(second[key])) {
      const child = getDifference(first[key], second[key]);
      return buildNode(key, UNCHANGED, null, child);
    }
    if (first[key] === second[key]) {
      return buildNode(key, UNCHANGED, { current: second[key] });
    }
    return buildNode(key, CHANGED, { current: second[key], previous: first[key] });
  };

  const keys = _.sortBy(_.union(_.keys(firstObj), _.keys(secondObj)));
  return keys.map((key) => getKeyDifference(firstObj, secondObj, key));
};

export default getDifference;
