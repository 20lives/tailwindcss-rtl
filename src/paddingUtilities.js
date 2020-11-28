const nameClass = require('./util/nameClass');

module.exports = (theme) => {
  const generators = [
    ([modifier, size]) => ({
      [nameClass('ps', modifier)]: { paddingInlineStart: size },
      [nameClass('pe', modifier)]: { paddingInlineEnd: size },
    }),
  ];

  return generators.flatMap(generator => Object.entries(theme('padding')).flatMap(generator));
};
