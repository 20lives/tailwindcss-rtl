const _ = require('lodash');

const generators = (e, target) => [
  target('padding') === 'ie11' ?
  (size, modifier) => ({
    [`[dir="rtl"] .${e(`ps-${modifier}`)}`]: { paddingRight: `${size}` },
    [`[dir="rtl"] .${e(`pe-${modifier}`)}`]: { paddingLeft: `${size}` },
    [`[dir="ltr"] .${e(`pe-${modifier}`)}`]: { paddingRight: `${size}` },
    [`[dir="ltr"] .${e(`ps-${modifier}`)}`]: { paddingLeft: `${size}` },
  }) :
  (size, modifier) => ({
    [`.${e(`ps-${modifier}`)}`]: { paddingInlineStart: `${size}` },
    [`.${e(`pe-${modifier}`)}`]: { paddingInlineEnd: `${size}` },
  }),
];

module.exports = (theme, e, target) => {
  return _.flatMap(generators(e, target), (generator) => {
    return _.flatMap(theme('padding'), generator);
  });
};
