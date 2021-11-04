const utilities = () => ({
  ':not([dir="rtl"]) .clear-start': { clear: 'left' },
  ':not([dir="rtl"]) .clear-end': { clear: 'right' },
  '[dir="rtl"] .clear-start': { clear: 'right' },
  '[dir="rtl"] .clear-end': { clear: 'left' },
});

module.exports = utilities;
