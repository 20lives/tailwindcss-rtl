const utilities = () => ({
  '[dir="rtl"] .text-start': { 'text-align': 'right' },
  '[dir="rtl"] .text-end': { 'text-align': 'left' },
  '[dir="ltr"] .text-end': { 'text-align': 'right' },
  '[dir="ltr"] .text-start': { 'text-align': 'left' },
});

module.exports = utilities;
