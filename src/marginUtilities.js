const nameClass = require('./util/nameClass');

module.exports = (theme) => {
  const generators = [([modifier, size]) => ({
    [nameClass('ms', modifier)]: { marginInlineStart: size },
    [nameClass('me', modifier)]: { marginInlineEnd: size },
  })];

  return generators.flatMap(generator => Object.entries(theme('margin')).flatMap(generator));
};
