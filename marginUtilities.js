const _ = require('lodash');
const {
  default: prefixNegativeModifiers,
} = require('tailwindcss/lib/util/prefixNegativeModifiers');

const generators = (e, target) => [
  target('margin') === 'ie11' ?
  (size, modifier) => ({
    [`[dir="rtl"] .${e(prefixNegativeModifiers('ms', modifier))}`]: {
      marginLeft: `${size}`,
    },
    [`[dir="rtl"] .${e(prefixNegativeModifiers('me', modifier))}`]: {
      marginRight: `${size}`,
    },
    [`[dir="ltr"] .${e(prefixNegativeModifiers('ms', modifier))}`]: {
      marginLeft: `${size}`,
    },
    [`[dir="ltr"] .${e(prefixNegativeModifiers('me', modifier))}`]: {
      marginRight: `${size}`,
    },
  }) :
  (size, modifier) => ({
    [`.${e(prefixNegativeModifiers('ms', modifier))}`]: {
      marginInlineStart: `${size}`,
    },
    [`.${e(prefixNegativeModifiers('me', modifier))}`]: {
      marginInlineEnd: `${size}`,
    },
  }),
];

module.exports = (theme, e, target) => {
  return _.flatMap(generators(e, target), (generator) => {
    return _.flatMap(theme('margin'), generator);
  });
};
