const utilities = () => ({
  'html[dir="ltr"] .clear-start': { clear: 'left' },
  'html[dir="ltr"] .clear-end': { clear: 'right' },
  'html[dir="rtl"] .clear-start': { clear: 'right' },
  'html[dir="rtl"] .clear-end': { clear: 'left' },
});

module.exports = utilities;
