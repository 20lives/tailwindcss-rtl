const _ = require('lodash');
const {
  default: prefixNegativeModifiers,
} = require('tailwindcss/lib/util/prefixNegativeModifiers');

const generators = (e) => [
  (size, modifier) => ({
    [`[dir="rtl"] .${e(prefixNegativeModifiers('start', modifier))}`]: {
      right: `${size}`,
    },
    [`[dir="rtl"] .${e(prefixNegativeModifiers('end', modifier))}`]: {
      left: `${size}`,
    },
    [`[dir="ltr"] .${e(prefixNegativeModifiers('end', modifier))}`]: {
      right: `${size}`,
    },
    [`[dir="ltr"] .${e(prefixNegativeModifiers('start', modifier))}`]: {
      left: `${size}`,
    },
  }),
];

module.exports = (theme, e) => {
  return _.flatMap(generators(e), (generator) => {
    return _.flatMap(theme('inset'), generator);
  });
};
