const { default: escapeClassName } = require('tailwindcss/lib/util/escapeClassName');


const asClass = (name) => `.${escapeClassName(name)}`;

module.exports = (classPrefix, key) => {
  if (['default', 'DEFAULT'].includes(key)) {
    return asClass(classPrefix);
  }

  if (key === '-') {
    return asClass(`-${classPrefix}`);
  }

  if (key.startsWith('-')) {
    return asClass(`-${classPrefix}${key}`);
  }

  return asClass(`${classPrefix}-${key}`);
};
