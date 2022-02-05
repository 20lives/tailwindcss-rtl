const nameClass = require('./util/nameClass.js');

module.exports = (theme) => {
  const generators = [
    ([modifier, size]) => ({
      ['[dir="rtl"] ' + nameClass('start', modifier)]: {
        right: size,
      },
      ['[dir="rtl"] ' + nameClass('end', modifier)]: {
        left: size,
      },
      ['[dir="ltr"] ' + nameClass('end', modifier)]: {
        right: size,
      },
      ['[dir="ltr"] ' + nameClass('start', modifier)]: {
        left: size,
      },
    }),
  ];
  return generators.flatMap(generator => Object.entries(theme('inset')).flatMap(generator));
};
