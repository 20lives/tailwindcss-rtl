import _ from 'lodash';
import prefixNegativeModifiers from 'util/prefixNegativeModifiers';

export default function() {
  return function({ addUtilities, e, theme, variants }) {

    const paddingGenerators = [
      (size, modifier) => ({
        [`.${e(`pr-${modifier}`)}`]: { 'padding-right': `${size}` },
        [`.${e(`pl-${modifier}`)}`]: { 'padding-left': `${size}` },
      }),
    ]

    const paddingUtilities = _.flatMap(generators, generator => {
      return _.flatMap(theme('padding'), generator);
    })

    addUtilities(marginUtilities, variants('padding'));

    const marginGenerators = [
      (size, modifier) => ({
        [`.${e(prefixNegativeModifiers('mr', modifier))}`]: { 'margin-right': `${size}` },
        [`.${e(prefixNegativeModifiers('ml', modifier))}`]: { 'margin-left': `${size}` },
      }),
    ]

    const marginUtilities = _.flatMap(generators, generator => {
      return _.flatMap(theme('margin'), generator)
    })

    addUtilities(paddingUtilities, variants('margin'));

    addUtilities(
      {
        '.float-right': { float: 'right' },
        '.float-left': { float: 'left' },
      },
      variants('float'),
    );
  };
}
