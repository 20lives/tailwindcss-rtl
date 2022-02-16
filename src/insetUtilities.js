const nameClass = require('./util/nameClass.js');

module.exports = (theme) => {
  const generators = [
    ([modifier, size]) => ({
      [nameClass('start', modifier)]: {
        insetInlineStart: size,
      },
      [nameClass('end', modifier)]: {
        insetInlineEnd: size,
      },
    }),
  ];
  return generators.flatMap(generator => Object.entries(theme('inset')).flatMap(generator));
};
