export { default as Collection } from './orm/collection';
export { default as Db } from './db';
export { default as IdentityManager } from './identity-manager';
export { default as Factory } from './factory';
export { default as faker } from './faker';
export { default as Response } from './response';
export { default, default as Server, defaultPassthroughs } from './server';
export { default as trait } from './trait'
export { default as Model } from './orm/model';
export { default as Schema } from './orm/schema';
export { default as Serializer } from './serializer';
export { default as ActiveModelSerializer } from './serializers/active-model-serializer';
export { default as RestSerializer } from './serializers/rest-serializer';
export { default as JsonApiSerializer } from './serializers/json-api-serializer';
export { default as referenceSort } from './utils/reference-sort';
export { default as BaseShorthandRouteHandler } from './route-handlers/shorthands/base';
export * from './utils/inflector';
export * from './utils/normalize-name';


import BelongsTo from './orm/associations/belongs-to';
import HasMany from './orm/associations/has-many.js';
import Association from './orm/associations/association';

export function association(...args) {
  return new Association(...args);
}

export function hasMany(...args) {
  return new HasMany(...args);
}
export function belongsTo(...args) {
  return new BelongsTo(...args);
}
