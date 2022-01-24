const utilities = () => ({
  'body:not([dir="rtl"]) .clear-start': { clear: 'left' },
  'body:not([dir="rtl"]) .clear-end': { clear: 'right' },
  'body[dir="rtl"] .clear-start': { clear: 'right' },
  'body[dir="rtl"] .clear-end': { clear: 'left' },
});

module.exports = utilities;
