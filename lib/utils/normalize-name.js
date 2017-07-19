import {
  camelize,
  pluralize,
  singularize,
  dasherize,
  underscore
} from 'inflected';

export function toCollectionName(type) {
  let modelName = dasherize(type);
  return camelize(underscore(pluralize(modelName)), false);
}

export function toModelName(type) {
  let modelName = dasherize(underscore(type));
  return singularize(modelName);
}
