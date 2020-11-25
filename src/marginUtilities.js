const _ = require('lodash');
const {
  default: prefixNegativeModifiers,
} = require('tailwindcss/lib/util/prefixNegativeModifiers');

const generators = (e) => [ (size, modifier) => ({
  [`.${e(prefixNegativeModifiers('ms', modifier))}`]: {
    marginInlineStart: `${size}`,
  },
  [`.${e(prefixNegativeModifiers('me', modifier))}`]: {
    marginInlineEnd: `${size}`,
  },
})];

module.exports = (theme, e) => {
  return _.flatMap(generators(e), (generator) => {
    return _.flatMap(theme('margin'), generator);
  });
};
