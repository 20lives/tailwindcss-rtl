const utilities = () => ({
  ':not([dir="rtl"]) .float-end': { float: 'right' },
  ':not([dir="rtl"]) .float-start': { float: 'left' },
  '[dir="rtl"] .float-start': { float: 'right' },
  '[dir="rtl"] .float-end': { float: 'left' },
});

module.exports = utilities;
