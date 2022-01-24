const utilities = () => ({
  ':not([dir="rtl"]) .text-end': { 'text-align': 'right' },
  ':not([dir="rtl"]) .text-start': { 'text-align': 'left' },
  '[dir="rtl"] .text-start': { 'text-align': 'right' },
  '[dir="rtl"] .text-end': { 'text-align': 'left' },
});

module.exports = utilities;
