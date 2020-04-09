const _ = require('lodash');
const { default: prefixNegativeModifiers } = require("tailwindcss/lib/util/prefixNegativeModifiers");

module.exports = (theme, e) => {
  return _.flatMap(generators(e), generator => {
    return _.flatMap(theme('margin'), generator);
  });
};

const generators = (e) => [
  (size, modifier) => ({
    [`[dir='rtl'] .${e(prefixNegativeModifiers('ms', modifier))}`]: { 'margin-right': `${size}` },
    [`[dir='rtl'] .${e(prefixNegativeModifiers('me', modifier))}`]: { 'margin-left': `${size}` },
    [`[dir='ltr'] .${e(prefixNegativeModifiers('ms', modifier))}`]: { 'margin-left': `${size}` },
    [`[dir='ltr'] .${e(prefixNegativeModifiers('me', modifier))}`]: { 'margin-right': `${size}` },
  }),
]
