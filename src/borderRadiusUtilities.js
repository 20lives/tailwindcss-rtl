const nameClass = require('./util/nameClass');

module.exports = (theme) => {
  const generators = [
    ([modifier, value]) => ({
      ['body:not([dir="rtl"]) ' + nameClass('rounded-e', modifier)]: {
        borderTopRightRadius: value,
        borderBottomRightRadius: value,
      },
      ['body:not([dir="rtl"]) ' + nameClass('rounded-s', modifier)]: {
        borderTopLeftRadius: value,
        borderBottomLeftRadius: value,
      },
      ['body[dir="rtl"] ' + nameClass('rounded-e', modifier)]: {
        borderTopLeftRadius: value,
        borderBottomLeftRadius: value,
      },
      ['body[dir="rtl"] ' + nameClass('rounded-s', modifier)]: {
        borderTopRightRadius: value,
        borderBottomRightRadius: value,
      },
    }),
    ([modifier, value]) => ({
      ['body:not([dir="rtl"]) ' + nameClass('rounded-ts', modifier)]: { borderTopLeftRadius: value },
      ['body:not([dir="rtl"]) ' + nameClass('rounded-te', modifier)]: { borderTopRightRadius: value },
      ['body:not([dir="rtl"]) ' + nameClass('rounded-be', modifier)]: { borderBottomRightRadius: value },
      ['body:not([dir="rtl"]) ' + nameClass('rounded-bs', modifier)]: { borderBottomLeftRadius: value },
      ['body[dir="rtl"] ' + nameClass('rounded-te', modifier)]: { borderTopLeftRadius: value },
      ['body[dir="rtl"] ' + nameClass('rounded-ts', modifier)]: { borderTopRightRadius: value },
      ['body[dir="rtl"] ' + nameClass('rounded-bs', modifier)]: { borderBottomRightRadius: value },
      ['body[dir="rtl"] ' + nameClass('rounded-be', modifier)]: { borderBottomLeftRadius: value },
    }),
  ];

  return generators.flatMap(generator => Object.entries(theme('borderRadius')).flatMap(generator));
};
