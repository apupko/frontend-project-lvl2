import formatToStylish from './stylish.js';

const format = (nodes, style) => {
  const mappingFormat = {
    stylish: formatToStylish(nodes),
  };
  return mappingFormat[style];
};

export default format;
