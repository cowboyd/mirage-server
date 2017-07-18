if (!QUnit) {
  throw new Error('QUnit must be loaded. globally');
}

export const test = QUnit.test;
export const assert = QUnit.assert;

const _module = QUnit.module;
export {_module as module };
