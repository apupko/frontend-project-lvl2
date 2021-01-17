import yaml from 'js-yaml';

export default (data) => {
  const errors = [];
  try {
    const obj = yaml.load(data);
    return obj;
  } catch (e) {
    errors.push('wrong YAML');
  }

  try {
    const obj = JSON.parse(data);
    return obj;
  } catch (e) {
    errors.push('or JSON format');
  }

  throw new Error(`Wrong file format (${errors.join(' ')})`);
};
