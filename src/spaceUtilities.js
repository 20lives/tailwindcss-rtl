const _ = require('lodash');
const {
  default: prefixNegativeModifiers,
} = require('tailwindcss/lib/util/prefixNegativeModifiers');

module.exports = (theme, e) => {
  const generators = [(size, modifier) => ({
    [`.${e(prefixNegativeModifiers('space-s', modifier))} > :not(template) ~ :not(template)`]: {
      '--space-s-reverse': '0',
      marginInlineEnd: `calc(${size === '0' ? '0px' : size} * var(--space-s-reverse))`,
      marginInlineStart: `calc(${size === '0' ? '0px' : size} * calc(1 - var(--space-s-reverse)))`,
    },
  }),
  ];

  return _.flatMap(generators, generator => [
    ..._.flatMap(theme('space'), generator),
    { '.space-s-reverse > :not(template) ~ :not(template)': { '--space-s-reverse': '1' } },
  ]);
};
