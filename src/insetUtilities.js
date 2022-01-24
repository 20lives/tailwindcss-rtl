const nameClass = require('./util/nameClass.js');

module.exports = (theme) => {
  const generators = [
    ([modifier, size]) => ({
      ['body[dir="rtl"] ' + nameClass('start', modifier)]: {
        right: size,
      },
      ['body[dir="rtl"] ' + nameClass('end', modifier)]: {
        left: size,
      },
      ['body:not([dir="rtl"]) ' + nameClass('end', modifier)]: {
        right: size,
      },
      ['body:not([dir="rtl"]) ' + nameClass('start', modifier)]: {
        left: size,
      },
    }),
  ];
  return generators.flatMap(generator => Object.entries(theme('inset')).flatMap(generator));
};
