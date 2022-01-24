const utilities = () => ({
  'body[dir="rtl"] .float-start': { float: 'right' },
  'body[dir="rtl"] .float-end': { float: 'left' },
  'body:not([dir="rtl"]) .float-end': { float: 'right' },
  'body:not([dir="rtl"]) .float-start': { float: 'left' },
});

module.exports = utilities;
