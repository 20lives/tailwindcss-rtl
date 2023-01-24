module.exports = ({ matchUtilities, theme }) => {
  matchUtilities(
    {
      start: (value) => ({
        '[dir="rtl"] &': {
          right: value,
        },
        '[dir="ltr"] &': {
          left: value,
        },
      }),
      end: (value) => ({
        '[dir="rtl"] &': {
          left: value,
        },
        '[dir="ltr"] &': {
          right: value,
        },
      }),
    },
    {
      supportsNegativeValues: true,
      values: theme("inset"),
    }
  );
};
