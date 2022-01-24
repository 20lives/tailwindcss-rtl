const utilities = () => ({
  'html[dir="ltr"] .float-end': { float: 'right' },
  'html[dir="ltr"] .float-start': { float: 'left' },
  'html[dir="rtl"] .float-start': { float: 'right' },
  'html[dir="rtl"] .float-end': { float: 'left' },
});

module.exports = utilities;
