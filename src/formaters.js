import {
  ADDED,
  REMOVED,
  UPDATED,
  NO_CHANGED,
  isObject,
} from './gendiff.js';

const createIndent = (level, symbol = ' ', count = 4) => symbol.repeat(level * count - 2);
const formatValueAsObject = (value, level) => `{\n${value}${createIndent(level)}  }`;

const objToString = (obj, level) => {
  const result = Object.entries(obj).map(([key, value]) => {
    const valueStr = isObject(value) ? objToString(value, level + 1) : value;
    return `${createIndent(level + 1)}  ${key}: ${valueStr}\n`;
  }).join('');
  return formatValueAsObject(result, level);
};

const valueToString = (value, level) => (
  isObject(value) ? objToString(value, level) : value
);

const buildPropertyString = (level, name, change, currentValue, prevValue) => {
  const build = (value, prefix = ' ') => `${createIndent(level)}${prefix} ${name}: ${value}\n`;
  const mappingChange = {
    [ADDED]: build(currentValue, '+'),
    [REMOVED]: build(currentValue, '-'),
    [UPDATED]: build(prevValue, '-').concat(build(currentValue, '+')),
    [NO_CHANGED]: build(currentValue),
  };
  return mappingChange[change];
};

const nodeToString = (node, level) => {
  const { name, change } = node;
  const { child, value } = node;
  const { current, previous } = value || {};
  const currentValueString = child
    ? formatValueAsObject(child.map((item) => nodeToString(item, level + 1)).join(''), level)
    : valueToString(current, level);
  const previousValueString = valueToString(previous, level);

  return buildPropertyString(level, name, change, currentValueString, previousValueString);
};

const formatToStylish = (nodes) => {
  const result = nodes.map((node) => nodeToString(node, 1)).join('');
  return `{\n${result}}\n`;
};

const format = (nodes, style = 'stylish') => {
  const mappingFormat = {
    stylish: formatToStylish(nodes),
  };
  return mappingFormat[style];
};

export default format;
