const _ = require('lodash');

module.exports = (theme, e, target) => {
  const generators = (target('space') === 'ie11') ?
    [(size, modifier) => ({
      [`[dir="ltr"] .${e(`divide-s${modifier}`)} > :not(template) ~ :not(template)`]: {
        borderLeftWidth: size,
      },
      [`[dir="rtl"] .${e(`divide-s${modifier}`)} > :not(template) ~ :not(template)`]: {
        borderRightWidth: size,
      },
    }),
    ] : [(size, modifier) => ({
      [`.${e(`divide-s${modifier}`)} > :not(template) ~ :not(template)`]: {
        '--divide-s-reverse': '0',
        borderInlineEndWidth: `calc(${size === '0' ? '0px' : size} * var(--divide-s-reverse))`,
        borderInlineStartWidth: `calc(${size === '0' ? '0px' : size} * calc(1 - var(--divide-s-reverse)))`,
      },
    }),
    ];

  return (target('space') === 'ie11') ?
    _.flatMap(generators, generator => {
      return _.flatMap(theme('divideWidth'), (value, modifier) => {
        return generator(value, modifier === 'default' ? '' : `-${modifier}`);
      });
    }) :
    _.flatMap(generators, generator => [
      ..._.flatMap(theme('divideWidth'), (value, modifier) => {
        return generator(value, modifier === 'default' ? '' : `-${modifier}`);
      }), {
        '.divide-s-reverse > :not(template) ~ :not(template)': { '--divide-s-reverse': '1' },
      },
    ]);
};
