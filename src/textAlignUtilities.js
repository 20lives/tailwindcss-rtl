const utilities = () => ({
  'body[dir="rtl"] .text-start': { 'text-align': 'right' },
  'body[dir="rtl"] .text-end': { 'text-align': 'left' },
  'body:not([dir="rtl"]) .text-end': { 'text-align': 'right' },
  'body:not([dir="rtl"]) .text-start': { 'text-align': 'left' },
});

module.exports = utilities;
