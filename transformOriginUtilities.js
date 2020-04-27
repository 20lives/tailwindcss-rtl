const utilities = () => ({
  '[dir="rtl"] .origin-top-start': { 'transform-origin': 'top right' },
  '[dir="rtl"] .origin-top-end': { 'transform-origin': 'top right' },
  '[dir="rtl"] .origin-bottom-start': { 'transform-origin': 'bottom right' },
  '[dir="rtl"] .origin-start': { 'transform-origin': 'bottom right' },
  '[dir="rtl"] .origin-end': { 'transform-origin': 'bottom right' },
  '[dir="ltr"] .origin-top-start': { 'transform-origin': 'top left' },
  '[dir="ltr"] .origin-top-end': { 'transform-origin': 'top left' },
  '[dir="ltr"] .origin-bottom-start': { 'transform-origin': 'bottom left' },
  '[dir="ltr"] .origin-start': { 'transform-origin': 'bottom left' },
  '[dir="ltr"] .origin-end': { 'transform-origin': 'bottom left' },
});

module.exports = utilities;
