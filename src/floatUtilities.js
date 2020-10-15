const utilities = () => ({
  '[dir="rtl"] .float-start': { float: 'right' },
  '[dir="rtl"] .float-end': { float: 'left' },
  '[dir="ltr"] .float-end': { float: 'right' },
  '[dir="ltr"] .float-start': { float: 'left' },
});

module.exports = utilities;
