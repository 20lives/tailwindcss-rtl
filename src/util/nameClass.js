const { default: escapeClassName } = require('tailwindcss/lib/util/escapeClassName');


function asClass(name) {
  return `.${escapeClassName(name)}`;
}

module.exports = (classPrefix, key) => {
  if (key === 'default') {
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
