const _ = require('lodash');

const generators = (e) => [
  (value, modifier) => ({
    [`[dir="ltr"] .${e(`rounded-e${modifier}`)}`]: {
      borderTopRightRadius: `${value}`,
      borderBottomRightRadius: `${value}`,
    },
    [`[dir="ltr"] .${e(`rounded-s${modifier}`)}`]: {
      borderTopLeftRadius: `${value}`,
      borderBottomLeftRadius: `${value}`,
    },
    [`[dir="rtl"] .${e(`rounded-e${modifier}`)}`]: {
      borderTopLeftRadius: `${value}`,
      borderBottomLeftRadius: `${value}`,
    },
    [`[dir="rtl"] .${e(`rounded-s${modifier}`)}`]: {
      borderTopRightRadius: `${value}`,
      borderBottomRightRadius: `${value}`,
    },
  }),
  (value, modifier) => ({
    [`[dir="ltr"] .${e(`rounded-ts${modifier}`)}`]: {
      borderTopLeftRadius: `${value}`,
    },
    [`[dir="ltr"] .${e(`rounded-te${modifier}`)}`]: {
      borderTopRightRadius: `${value}`,
    },
    [`[dir="ltr"] .${e(`rounded-be${modifier}`)}`]: {
      borderBottomRightRadius: `${value}`,
    },
    [`[dir="ltr"] .${e(`rounded-bs${modifier}`)}`]: {
      borderBottomLeftRadius: `${value}`,
    },
    [`[dir="rtl"] .${e(`rounded-te${modifier}`)}`]: {
      borderTopLeftRadius: `${value}`,
    },
    [`[dir="rtl"] .${e(`rounded-ts${modifier}`)}`]: {
      borderTopRightRadius: `${value}`,
    },
    [`[dir="rtl"] .${e(`rounded-bs${modifier}`)}`]: {
      borderBottomRightRadius: `${value}`,
    },
    [`[dir="rtl"] .${e(`rounded-be${modifier}`)}`]: {
      borderBottomLeftRadius: `${value}`,
    },
  }),
];

module.exports = (theme, e) => {
  return _.flatMap(generators(e), (generator) => {
    return _.flatMap(theme('borderRadius'), (value, modifier) => {
      return generator(value, modifier === 'default' ? '' : `-${modifier}`);
    });
  });
};
