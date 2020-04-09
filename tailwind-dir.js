const plugin = require("tailwindcss/plugin");
const _ = require('lodash');
const { default: prefixNegativeModifiers } = require("tailwindcss/lib/util/prefixNegativeModifiers");

module.exports = plugin(function({ addUtilities, e, theme, variants }) {
  const paddingGenerators = [
    (size, modifier) => ({
      [`[dir='rtl'] .${e(`ps-${modifier}`)}`]: { 'padding-right': `${size}` },
      [`[dir='rtl'] .${e(`pe-${modifier}`)}`]: { 'padding-left': `${size}` },
      [`[dir='ltr'] .${e(`pe-${modifier}`)}`]: { 'padding-right': `${size}` },
      [`[dir='ltr'] .${e(`ps-${modifier}`)}`]: { 'padding-left': `${size}` },
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

  const insetGenerators = [
    (size, modifier) => ({
      [`[dir='rtl'] .${e(prefixNegativeModifiers('start', modifier))}`]: { right: `${size}` },
      [`[dir='rtl'] .${e(prefixNegativeModifiers('end', modifier))}`]: { left: `${size}` },
      [`[dir='ltr'] .${e(prefixNegativeModifiers('end', modifier))}`]: { right: `${size}` },
      [`[dir='ltr'] .${e(prefixNegativeModifiers('start', modifier))}`]: { left: `${size}` },
    }),
  ]

  const insetUtilities = _.flatMap(insetGenerators, generator => {
    return _.flatMap(theme('inset'), generator)
  });

  addUtilities(insetUtilities, variants('inset'));

  const clearUtilities = {
    "[dir='ltr'] .clear-start": { clear: 'left' },
    "[dir='ltr'] .clear-end": { clear: 'right' },
    "[dir='rtl'] .clear-start": { clear: 'right' },
    "[dir='rtl'] .clear-end": { clear: 'left' },
  };

  addUtilities(clearUtilities, variants('clear'));

  const borderRadiusGenerators = [
    (value, modifier) => ({
      [`[dir='ltr'] .${e(`rounded-e${modifier}`)}`]: {
        borderTopRightRadius: `${value}`,
        borderBottomRightRadius: `${value}`,
      },
      [`[dir='ltr'] .${e(`rounded-s${modifier}`)}`]: {
        borderTopLeftRadius: `${value}`,
        borderBottomLeftRadius: `${value}`,
      },
      [`[dir='rtl'] .${e(`rounded-e${modifier}`)}`]: {
        borderTopLeftRadius: `${value}`,
        borderBottomLeftRadius: `${value}`,
      },
      [`[dir='rtl'] .${e(`rounded-s${modifier}`)}`]: {
        borderTopRightRadius: `${value}`,
        borderBottomRightRadius: `${value}`,
      },
    }),
    (value, modifier) => ({
      [`[dir='ltr'] .${e(`rounded-ts${modifier}`)}`]: { borderTopLeftRadius: `${value}` },
      [`[dir='ltr'] .${e(`rounded-te${modifier}`)}`]: { borderTopRightRadius: `${value}` },
      [`[dir='ltr'] .${e(`rounded-be${modifier}`)}`]: { borderBottomRightRadius: `${value}` },
      [`[dir='ltr'] .${e(`rounded-bs${modifier}`)}`]: { borderBottomLeftRadius: `${value}` },
      [`[dir='rtl'] .${e(`rounded-te${modifier}`)}`]: { borderTopLeftRadius: `${value}` },
      [`[dir='rtl'] .${e(`rounded-ts${modifier}`)}`]: { borderTopRightRadius: `${value}` },
      [`[dir='rtl'] .${e(`rounded-bs${modifier}`)}`]: { borderBottomRightRadius: `${value}` },
      [`[dir='rtl'] .${e(`rounded-be${modifier}`)}`]: { borderBottomLeftRadius: `${value}` },
    }),
  ]

  const borderRadiusUtilities = _.flatMap(borderRadiusGenerators, generator => {
    return _.flatMap(theme('borderRadius'), (value, modifier) => {
      return generator(value, modifier === 'default' ? '' : `-${modifier}`)
    })
  })

  addUtilities(borderRadiusUtilities, variants('borderRadius'))
});
