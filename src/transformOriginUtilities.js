const utilities = () => ({
  ':not([dir="rtl"]) .origin-top-start': { 'transform-origin': 'top left' },
  ':not([dir="rtl"]) .origin-top-end': { 'transform-origin': 'top right' },
  ':not([dir="rtl"]) .origin-bottom-start': { 'transform-origin': 'bottom left' },
  ':not([dir="rtl"]) .origin-bottom-end': { 'transform-origin': 'bottom right' },
  ':not([dir="rtl"]) .origin-start': { 'transform-origin': 'left' },
  ':not([dir="rtl"]) .origin-end': { 'transform-origin': 'right' },
  '[dir="rtl"] .origin-top-start': { 'transform-origin': 'top right' },
  '[dir="rtl"] .origin-top-end': { 'transform-origin': 'top left' },
  '[dir="rtl"] .origin-bottom-start': { 'transform-origin': 'bottom right' },
  '[dir="rtl"] .origin-bottom-end': { 'transform-origin': 'bottom left' },
  '[dir="rtl"] .origin-start': { 'transform-origin': 'right' },
  '[dir="rtl"] .origin-end': { 'transform-origin': 'left' },
});

module.exports = utilities;
