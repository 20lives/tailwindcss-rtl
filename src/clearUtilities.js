const utilities = () => ({
  '[dir="ltr"] .clear-start': { clear: 'left' },
  '[dir="ltr"] .clear-end': { clear: 'right' },
  '[dir="rtl"] .clear-start': { clear: 'right' },
  '[dir="rtl"] .clear-end': { clear: 'left' },
});

module.exports = utilities;
