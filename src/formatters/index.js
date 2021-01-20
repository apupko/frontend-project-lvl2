import formatToStylish from './stylish.js';
import formatToPlain from './plain.js';
import formatToJson from './json.js';
const format = (nodes, style) => {
  const mappingFormat = {
    stylish: formatToStylish(nodes),
    plain: formatToPlain(nodes),
    json: formatToJson(nodes),
  };
  return mappingFormat[style];
};

export default format;
