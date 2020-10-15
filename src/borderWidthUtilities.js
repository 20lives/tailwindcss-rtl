const _ = require('lodash');

const generators = (e, target) => [
  target('borderWidth') === 'ie11' ?
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
    }) :
    (value, modifier) => ({
      [`.${e(`border-e${modifier}`)}`]: {
        borderInlineEndWidth: `${value}`,
      },
      [`.${e(`border-s${modifier}`)}`]: {
        borderInlineStartWidth: `${value}`,
      },
    }),
];

module.exports = (theme, e, target) => {
  return _.flatMap(generators(e, target), (generator) => {
    return _.flatMap(theme('borderWidth'), (value, modifier) => {
      return generator(value, modifier === 'default' ? '' : `-${modifier}`);
    });
  });
};
