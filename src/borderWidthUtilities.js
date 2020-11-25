const _ = require('lodash');

const generators = (e) => [
  (value, modifier) => ({
    [`.${e(`border-e${modifier}`)}`]: {
      borderInlineEndWidth: `${value}`,
    },
    [`.${e(`border-s${modifier}`)}`]: {
      borderInlineStartWidth: `${value}`,
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
