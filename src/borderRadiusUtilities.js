const nameClass = require('./util/nameClass');

module.exports = (theme) => {
  const generators = [
    ([modifier, value]) => ({
      ['html[dir="ltr"] ' + nameClass('rounded-e', modifier)]: {
        borderTopRightRadius: value,
        borderBottomRightRadius: value,
      },
      ['html[dir="ltr"] ' + nameClass('rounded-s', modifier)]: {
        borderTopLeftRadius: value,
        borderBottomLeftRadius: value,
      },
      ['html[dir="rtl"] ' + nameClass('rounded-e', modifier)]: {
        borderTopLeftRadius: value,
        borderBottomLeftRadius: value,
      },
      ['html[dir="rtl"] ' + nameClass('rounded-s', modifier)]: {
        borderTopRightRadius: value,
        borderBottomRightRadius: value,
      },
    }),
    ([modifier, value]) => ({
      ['html[dir="ltr"] ' + nameClass('rounded-ts', modifier)]: { borderTopLeftRadius: value },
      ['html[dir="ltr"] ' + nameClass('rounded-te', modifier)]: { borderTopRightRadius: value },
      ['html[dir="ltr"] ' + nameClass('rounded-be', modifier)]: { borderBottomRightRadius: value },
      ['html[dir="ltr"] ' + nameClass('rounded-bs', modifier)]: { borderBottomLeftRadius: value },
      ['html[dir="rtl"] ' + nameClass('rounded-te', modifier)]: { borderTopLeftRadius: value },
      ['html[dir="rtl"] ' + nameClass('rounded-ts', modifier)]: { borderTopRightRadius: value },
      ['html[dir="rtl"] ' + nameClass('rounded-bs', modifier)]: { borderBottomRightRadius: value },
      ['html[dir="rtl"] ' + nameClass('rounded-be', modifier)]: { borderBottomLeftRadius: value },
    }),
  ];

  return generators.flatMap(generator => Object.entries(theme('borderRadius')).flatMap(generator));
};
