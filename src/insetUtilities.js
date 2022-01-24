const nameClass = require('./util/nameClass.js');

module.exports = (theme) => {
  const generators = [
    ([modifier, size]) => ({
      [':not([dir="rtl"]) ' + nameClass('end', modifier)]: {
        right: size,
      },
      [':not([dir="rtl"]) ' + nameClass('start', modifier)]: {
        left: size,
      },
      ['[dir="rtl"] ' + nameClass('start', modifier)]: {
        right: size,
      },
      ['[dir="rtl"] ' + nameClass('end', modifier)]: {
        left: size,
      },
    }),
  ];
  return generators.flatMap(generator => Object.entries(theme('inset')).flatMap(generator));
};
