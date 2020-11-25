const _ = require('lodash');

const generators = (e) => [
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
