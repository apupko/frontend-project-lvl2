import * as types from '../gendiff.js';

const createIndent = (level, symbol = ' ', count = 4) => symbol.repeat(level * count - 2);
const formatValueAsObject = (value, level) => `{\n${value}${createIndent(level)}  }`;

const objToString = (obj, level) => {
  const result = Object.entries(obj).map(([key, value]) => {
    const valueStr = types.isObject(value) ? objToString(value, level + 1) : value;
    return `${createIndent(level + 1)}  ${key}: ${valueStr}\n`;
  }).join('');
  return formatValueAsObject(result, level);
};

const valueToString = (value, level) => (
  types.isObject(value) ? objToString(value, level) : value
);

const buildPropertyString = (level, name, change, currentValue, prevValue) => {
  const build = (value, prefix = ' ') => `${createIndent(level)}${prefix} ${name}: ${value}\n`;
  const mappingChange = {
    [types.ADDED]: build(currentValue, '+'),
    [types.REMOVED]: build(currentValue, '-'),
    [types.CHANGED]: build(prevValue, '-').concat(build(currentValue, '+')),
    [types.UNCHANGED]: build(currentValue),
  };
  return mappingChange[change];
};

const nodeToString = (node, level = 1) => {
  const { name, change } = node;
  const { children, value } = node;
  const { current, previous } = value || {};
  const currentValueString = children
    ? formatValueAsObject(children.map((child) => nodeToString(child, level + 1)).join(''), level)
    : valueToString(current, level);
  const previousValueString = valueToString(previous, level);

  return buildPropertyString(level, name, change, currentValueString, previousValueString);
};

const formatToStylish = (nodes) => {
  const result = nodes.map((node) => nodeToString(node)).join('');
  return `{\n${result}}\n`;
};

export default formatToStylish;
