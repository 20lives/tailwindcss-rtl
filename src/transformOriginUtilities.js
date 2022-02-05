const utilities = () => ({
  '[dir="ltr"] .origin-top-start': { 'transform-origin': 'top left' },
  '[dir="ltr"] .origin-top-end': { 'transform-origin': 'top right' },
  '[dir="ltr"] .origin-bottom-start': { 'transform-origin': 'bottom left' },
  '[dir="ltr"] .origin-bottom-end': { 'transform-origin': 'bottom right' },
  '[dir="ltr"] .origin-start': { 'transform-origin': 'left' },
  '[dir="ltr"] .origin-end': { 'transform-origin': 'right' },
  '[dir="rtl"] .origin-top-start': { 'transform-origin': 'top right' },
  '[dir="rtl"] .origin-top-end': { 'transform-origin': 'top left' },
  '[dir="rtl"] .origin-bottom-start': { 'transform-origin': 'bottom right' },
  '[dir="rtl"] .origin-bottom-end': { 'transform-origin': 'bottom left' },
  '[dir="rtl"] .origin-start': { 'transform-origin': 'right' },
  '[dir="rtl"] .origin-end': { 'transform-origin': 'left' },
});

module.exports = utilities;
