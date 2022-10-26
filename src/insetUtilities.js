module.exports = ({ matchUtilities, theme }) => {
  matchUtilities(
    {
      start: (value) => ({
        '[dir="rtl"] &': {
          right: value,
        },
        '[dir="left"] &': {
          left: value,
        },
      }),
      end: (value) => ({
        '[dir="rtl"] &': {
          left: value,
        },
        '[dir="left"] &': {
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
