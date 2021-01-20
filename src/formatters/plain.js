import * as types from '../gendiff.js';

const valueToString = (value) => {
  if (types.isObject(value)) return '[complex value]';
  return typeof value === 'string' ? `'${value}'` : value;
};

const buildPropertyString = (path, change, value, prevValue) => {
  const mappingChange = {
    [types.ADDED]: `Property '${path}' was added with value: ${value}\n`,
    [types.REMOVED]: `Property '${path}' was removed\n`,
    [types.CHANGED]: `Property '${path}' was updated. From ${prevValue} to ${value}\n`,
    [types.UNCHANGED]: '',
  };
  return mappingChange[change];
};

const toPlainString = (node, parentPath = null) => {
  const { name, children, change } = node;
  const path = !parentPath ? name : `${parentPath}.${name}`;
  if (children) return children.map((child) => toPlainString(child, path)).join('');

  const currentValue = valueToString(node.value.current);
  const previousValue = valueToString(node.value.previous);
  return buildPropertyString(path, change, currentValue, previousValue);
};

const formatToPlain = (nodes) => nodes.map((node) => toPlainString(node)).join('');

export default formatToPlain;
