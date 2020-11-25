const _ = require('lodash');

module.exports = (theme, e) => {
  const generators = [(size, modifier) => ({
    [`.${e(`divide-s${modifier}`)} > :not(template) ~ :not(template)`]: {
      '--divide-s-reverse': '0',
      borderInlineEndWidth: `calc(${size === '0' ? '0px' : size} * var(--divide-s-reverse))`,
      borderInlineStartWidth: `calc(${size === '0' ? '0px' : size} * calc(1 - var(--divide-s-reverse)))`,
    },
  })];

  return _.flatMap(generators, generator => [
    ..._.flatMap(theme('divideWidth'), (value, modifier) => {
      return generator(value, modifier === 'default' ? '' : `-${modifier}`);
    }), {
      '.divide-s-reverse > :not(template) ~ :not(template)': { '--divide-s-reverse': '1' },
    },
  ]);
};
