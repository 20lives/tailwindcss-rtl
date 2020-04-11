const _ = require('lodash');

const generators = (e) => [
  (value, modifier) => ({
    [`[dir="ltr"] .${e(`border-e${modifier}`)}`]: {
      borderRightWidth: `${value}`,
    },
    [`[dir="ltr"] .${e(`border-s${modifier}`)}`]: {
      borderLeftWidth: `${value}`,
    },
    [`[dir="rtl"] .${e(`border-s${modifier}`)}`]: {
      borderRightWidth: `${value}`,
    },
    [`[dir="rtl"] .${e(`border-e${modifier}`)}`]: {
      borderLeftWidth: `${value}`,
    },
  }),
];

module.exports = (theme, e) => {
  return _.flatMap(generators(e), (generator) => {
    return _.flatMap(theme('borderWidth'), (value, modifier) => {
      return generator(value, modifier === 'default' ? '' : `-${modifier}`);
    });
  });
};
