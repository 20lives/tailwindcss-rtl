const utilities = () => ({
  '[dir="rtl"] .float-start': { float: 'right' },
  '[dir="rtl"] .float-end': { float: 'left' },
  ':not([dir="rtl"]) .float-end': { float: 'right' },
  ':not([dir="rtl"]) .float-start': { float: 'left' },
});

module.exports = utilities;
