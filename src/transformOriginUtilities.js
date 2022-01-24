const utilities = () => ({
  'body:not([dir="rtl"]) .origin-top-start': { 'transform-origin': 'top left' },
  'body:not([dir="rtl"]) .origin-top-end': { 'transform-origin': 'top right' },
  'body:not([dir="rtl"]) .origin-bottom-start': { 'transform-origin': 'bottom left' },
  'body:not([dir="rtl"]) .origin-bottom-end': { 'transform-origin': 'bottom right' },
  'body:not([dir="rtl"]) .origin-start': { 'transform-origin': 'left' },
  'body:not([dir="rtl"]) .origin-end': { 'transform-origin': 'right' },
  'body[dir="rtl"] .origin-top-start': { 'transform-origin': 'top right' },
  'body[dir="rtl"] .origin-top-end': { 'transform-origin': 'top left' },
  'body[dir="rtl"] .origin-bottom-start': { 'transform-origin': 'bottom right' },
  'body[dir="rtl"] .origin-bottom-end': { 'transform-origin': 'bottom left' },
  'body[dir="rtl"] .origin-start': { 'transform-origin': 'right' },
  'body[dir="rtl"] .origin-end': { 'transform-origin': 'left' },
});

module.exports = utilities;
