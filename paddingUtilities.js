const _ = require('lodash');

const generators = (e) => [
  (size, modifier) => ({
    [`[dir="rtl"] .${e(`ps-${modifier}`)}`]: { 'padding-right': `${size}` },
    [`[dir="rtl"] .${e(`pe-${modifier}`)}`]: { 'padding-left': `${size}` },
    [`[dir="ltr"] .${e(`pe-${modifier}`)}`]: { 'padding-right': `${size}` },
    [`[dir="ltr"] .${e(`ps-${modifier}`)}`]: { 'padding-left': `${size}` },
  }),
];

module.exports = (theme, e) => {
  return _.flatMap(generators(e), (generator) => {
    return _.flatMap(theme('padding'), generator);
  });
};
