const utilities = () => ({
  'html[dir="ltr"] .origin-top-start': { 'transform-origin': 'top left' },
  'html[dir="ltr"] .origin-top-end': { 'transform-origin': 'top right' },
  'html[dir="ltr"] .origin-bottom-start': { 'transform-origin': 'bottom left' },
  'html[dir="ltr"] .origin-bottom-end': { 'transform-origin': 'bottom right' },
  'html[dir="ltr"] .origin-start': { 'transform-origin': 'left' },
  'html[dir="ltr"] .origin-end': { 'transform-origin': 'right' },
  'html[dir="rtl"] .origin-top-start': { 'transform-origin': 'top right' },
  'html[dir="rtl"] .origin-top-end': { 'transform-origin': 'top left' },
  'html[dir="rtl"] .origin-bottom-start': { 'transform-origin': 'bottom right' },
  'html[dir="rtl"] .origin-bottom-end': { 'transform-origin': 'bottom left' },
  'html[dir="rtl"] .origin-start': { 'transform-origin': 'right' },
  'html[dir="rtl"] .origin-end': { 'transform-origin': 'left' },
});

module.exports = utilities;
