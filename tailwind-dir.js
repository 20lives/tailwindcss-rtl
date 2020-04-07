const plugin = require('tailwindcss/plugin');
const _ = require('lodash');
const prefixNegativeModifiers = require('./util/prefixNegativeModifiers');

module.exports = plugin(function({ addUtilities, e, theme, variants }) {
  const paddingGenerators = [
    (size, modifier) => ({
      [`[dir='rtl'] .ps-${modifier}`]: { 'padding-right': `${size}` },
      [`[dir='rtl'] .pe-${modifier}`]: { 'padding-left': `${size}` },
      [`[dir='ltr'] .ps-${modifier}`]: { 'padding-left': `${size}` },
      [`[dir='ltr'] .pe-${modifier}`]: { 'padding-right': `${size}` },
    }),
  ]

  const paddingUtilities = _.flatMap(paddingGenerators, generator => {
    return _.flatMap(theme('padding'), generator);
  })

  addUtilities(paddingUtilities, variants('padding'));

  const marginGenerators = [
    (size, modifier) => ({
      [`[dir='rtl'] .${e(prefixNegativeModifiers('ms', modifier))}`]: { 'margin-right': `${size}` },
      [`[dir='rtl'] .${e(prefixNegativeModifiers('me', modifier))}`]: { 'margin-left': `${size}` },
      [`[dir='ltr'] .${e(prefixNegativeModifiers('ms', modifier))}`]: { 'margin-left': `${size}` },
      [`[dir='ltr'] .${e(prefixNegativeModifiers('me', modifier))}`]: { 'margin-right': `${size}` },
    }),
  ]

  const marginUtilities = _.flatMap(marginGenerators, generator => {
    return _.flatMap(theme('margin'), generator)
  })

  addUtilities(marginUtilities, variants('margin'));


  const floatUtilities = {
    "[dir='rtl'] .float-start": { float: 'right' },
    "[dir='rtl'] .float-end": { float: 'left' },
    "[dir='ltr'] .float-end": { float: 'right' },
    "[dir='ltr'] .float-start": { float: 'left' },
  }

  addUtilities(floatUtilities, variants('float'));
});
