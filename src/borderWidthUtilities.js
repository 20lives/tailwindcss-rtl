const nameClass = require('./util/nameClass.js');

module.exports = (theme) => {
  const generators = [
    ([modifier, value]) => ({
      [nameClass('border-e', modifier)]: { borderInlineEndWidth: value },
      [nameClass('border-s', modifier)]: { borderInlineStartWidth: value },
    }),
  ];

  return generators.flatMap(generator => Object.entries(theme('borderWidth')).flatMap(generator));
};
