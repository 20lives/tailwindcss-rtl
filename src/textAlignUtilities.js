const utilities = () => ({
  'html[dir="ltr"] .text-end': { 'text-align': 'right' },
  'html[dir="ltr"] .text-start': { 'text-align': 'left' },
  'html[dir="rtl"] .text-start': { 'text-align': 'right' },
  'html[dir="rtl"] .text-end': { 'text-align': 'left' },
});

module.exports = utilities;
