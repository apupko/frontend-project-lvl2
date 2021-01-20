import yaml from 'js-yaml';

const parseToYaml = (data) => yaml.load(data);

const parseToJson = (data) => JSON.parse(data);

const mappingExtnameToParser = {
  '.yml': parseToYaml,
  '.json': parseToJson,
};

export default (data, extname) => mappingExtnameToParser[extname](data);
