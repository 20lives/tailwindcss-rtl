const _ = require('lodash');
const {
  default: prefixNegativeModifiers,
} = require('tailwindcss/lib/util/prefixNegativeModifiers');

module.exports = (theme, e, target) => {
  const generators = (target('space') === 'ie11') ?
    [(size, modifier) => ({
      [`[dir="ltr"] .${e( prefixNegativeModifiers('space-s', modifier))} > :not(template) ~ :not(template)`]: {
        marginLeft: size,
      },
      [`[dir="rtl"] .${e( prefixNegativeModifiers('space-s', modifier))} > :not(template) ~ :not(template)`]: {
        marginRight: size,
      },
    }),
    ] : [(size, modifier) => ({
        [`.${e(prefixNegativeModifiers('space-s', modifier))} > :not(template) ~ :not(template)`]: {
          '--space-s-reverse': '0',
          marginInlineEnd: `calc(${size === '0' ? '0px' : size} * var(--space-s-reverse))`,
          marginInlineStart: `calc(${size === '0' ? '0px' : size} * calc(1 - var(--space-s-reverse)))`,
        },
      }),
    ];

  return (target('space') === 'ie11') ?
    _.flatMap(generators, generator => _.flatMap(theme('space'), generator)) :
    _.flatMap(generators, generator => [
      ..._.flatMap(theme('space'), generator),
      { '.space-s-reverse > :not(template) ~ :not(template)': { '--space-s-reverse': '1' } },
    ]);
};
