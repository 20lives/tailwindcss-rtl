const nameClass = require('./util/nameClass');

module.exports = (theme) => {
  const generators = [
    ([modifier, value]) => ({
      ['[dir="ltr"] ' + nameClass('rounded-e', modifier)]: {
        borderTopRightRadius: value,
        borderBottomRightRadius: value,
      },
      ['[dir="ltr"] ' + nameClass('rounded-s', modifier)]: {
        borderTopLeftRadius: value,
        borderBottomLeftRadius: value,
      },
      ['[dir="rtl"] ' + nameClass('rounded-e', modifier)]: {
        borderTopLeftRadius: value,
        borderBottomLeftRadius: value,
      },
      ['[dir="rtl"] ' + nameClass('rounded-s', modifier)]: {
        borderTopRightRadius: value,
        borderBottomRightRadius: value,
      },
    }),
    ([modifier, value]) => ({
      ['[dir="ltr"] ' + nameClass('rounded-ts', modifier)]: { borderTopLeftRadius: value },
      ['[dir="ltr"] ' + nameClass('rounded-te', modifier)]: { borderTopRightRadius: value },
      ['[dir="ltr"] ' + nameClass('rounded-be', modifier)]: { borderBottomRightRadius: value },
      ['[dir="ltr"] ' + nameClass('rounded-bs', modifier)]: { borderBottomLeftRadius: value },
      ['[dir="rtl"] ' + nameClass('rounded-te', modifier)]: { borderTopLeftRadius: value },
      ['[dir="rtl"] ' + nameClass('rounded-ts', modifier)]: { borderTopRightRadius: value },
      ['[dir="rtl"] ' + nameClass('rounded-bs', modifier)]: { borderBottomRightRadius: value },
      ['[dir="rtl"] ' + nameClass('rounded-be', modifier)]: { borderBottomLeftRadius: value },
    }),
  ];

  return generators.flatMap(generator => Object.entries(theme('borderRadius')).flatMap(generator));
};
