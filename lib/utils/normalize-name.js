import {
  camelize,
  pluralize,
  singularize,
  dasherize
} from './inflector';

export function toCollectionName(type) {
  let modelName = dasherize(type);
  return camelize(pluralize(modelName));
}

export function toModelName(type) {
  let modelName = dasherize(type);
  return singularize(modelName);
}
