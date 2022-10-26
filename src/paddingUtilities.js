module.exports = ({ matchUtilities, theme }) => {
  matchUtilities(
    {
      ps: (value) => ({
        paddingInlineStart: value,
      }),
      pe: (value) => ({
        paddingInlineEnd: value,
      }),
    },
    {
      supportsNegativeValues: true,
      values: theme("padding"),
    }
  );
};
