const nameClass = require('./util/nameClass');

module.exports = (theme) => {
  const generators = [
    ([modifier, _size]) => {
      const size = _size === '0' ? '0px' : _size;
      return {
        [`${nameClass('divide-s', modifier)} > :not([hidden]) ~ :not([hidden])`]: {
          '--tw-divide-s-reverse': '0',
          borderInlineEndWidth: `calc(${size} * var(--tw-divide-s-reverse))`,
          borderInlineStartWidth: `calc(${size} * calc(1 - var(--tw-divide-s-reverse)))`,
        },
      };
    },
  ];

  const divideReverse = {
    '.divide-s-reverse > :not([hidden]) ~ :not([hidden])': {
      '--tw-divide-s-reverse': '1',
    },
  };

  return [
    ...generators.flatMap(generator => Object.entries(theme('divideWidth')).flatMap(generator)), 
    divideReverse,
  ] ;
};
