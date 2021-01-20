import formatToStylish from './stylish.js';
import formatToPlain from './plain.js';

const format = (nodes, style) => {
  const mappingFormat = {
    stylish: formatToStylish(nodes),
    plain: formatToPlain(nodes),
  };
  return mappingFormat[style];
};

export default format;
