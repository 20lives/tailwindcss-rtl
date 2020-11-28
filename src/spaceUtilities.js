const nameClass = require('./util/nameClass.js');

module.exports = (theme) => {
  const generators = [
    ([modifier, _size]) => {
      const size = _size === '0' ? '0px' : _size;
      return {
        [`${nameClass('space-s', modifier)} > :not([hidden]) ~ :not([hidden])`]: {
          '--tw-space-s-reverse': '0',
          marginInlineEnd: `calc(${size} * var(--tw-space-s-reverse))`,
          marginInlineStart: `calc(${size} * calc(1 - var(--tw-space-s-reverse)))`,
        },
      };
    },
  ];

  const spaceReverse = {
    '.space-s-reverse > :not([hidden]) ~ :not([hidden])': {
      '--tw-space-s-reverse': '1',
    },
  };

  return [
    ...generators.flatMap((generator) => Object.entries(theme('space')).flatMap(generator)),
    spaceReverse,
  ];
};
